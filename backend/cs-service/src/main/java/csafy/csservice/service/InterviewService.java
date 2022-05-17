package csafy.csservice.service;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.interview.InterviewCommentResponseDto;
import csafy.csservice.dto.interview.InterviewCreateDto;
import csafy.csservice.dto.interview.InterviewCreateSimpleDto;
import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.dto.request.RequestCreateInterview;
import csafy.csservice.entity.interview.*;
import csafy.csservice.entity.profile.Statistic;
import csafy.csservice.repository.interview.*;
import csafy.csservice.repository.profile.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final InterviewMemoRepository interviewMemoRepository;
    private final InterviewCommentRepository interviewCommentRepository;
    private final InterviewLikesRepository interviewLikesRepository;
    private final InterviewCommentLikesRepository interviewCommentLikesRepository;
    private final InterviewSeenRepository interviewSeenRepository;
    private final StatisticsRepository statisticsRepository;

    private final UserServiceClient userServiceClient;

    private final BadgeService badgeService;

    @PersistenceContext
    EntityManager em;

    public List<Interview> getInterviewList(String category){
        if(category.equalsIgnoreCase("all")){
            return interviewRepository.findAll();
        }
        else {
            category = category.equalsIgnoreCase("character") ? "인성" : "기술";
            return interviewRepository.findCategory(category);
        }
    }

    public Interview getInterview(Long interviewSeq){
        return interviewRepository.findById(interviewSeq).orElse(null);
    }

    @Transactional
    public List<InterviewCreateDto> createInterviewList(RequestCreateInterview requestCreateInterview, Long userSeq){
        if(requestCreateInterview.getCategory().equalsIgnoreCase("all")){

            JpaResultMapper jpaResultMapper = new JpaResultMapper();
            Query q = em.createNativeQuery("select i.*, m.memo from interview i left join interview_memo m " +
                    "on i.interview_seq = m.interview_seq and m.user_seq = " + userSeq +
                    " order by rand() limit " + requestCreateInterview.getQuestion());
            List<InterviewCreateDto> list = jpaResultMapper.list(q, InterviewCreateDto.class);
            interviewSeenUpdate(list, userSeq);
            return list;
//            return interviewRepository.findInterviewLimit(requestCreateInterview.getQuestion(), userSeq);
        }
        else {
            String category = requestCreateInterview.getCategory().equalsIgnoreCase("character") ? "인성" : "기술";
            JpaResultMapper jpaResultMapper = new JpaResultMapper();
            Query q = em.createNativeQuery("select i.*, m.memo from Interview i left join interview_memo m " +
                    "on i.interview_seq = m.interview_seq and m.user_seq = "+ userSeq + " where i.category = " + "\'" + category + "\'" +
                    " order by rand() limit " + requestCreateInterview.getQuestion());
            List<InterviewCreateDto> list = jpaResultMapper.list(q, InterviewCreateDto.class);
            interviewSeenUpdate(list, userSeq);
            return list;
//            return interviewRepository.findInterviewLimitCategory(category, requestCreateInterview.getQuestion(), userSeq);
        }
    }

    @Transactional
    public List<InterviewCreateSimpleDto> createSimpleInterviewList(RequestCreateInterview requestCreateInterview){
        if(requestCreateInterview.getCategory().equalsIgnoreCase("all")){

            JpaResultMapper jpaResultMapper = new JpaResultMapper();
            Query q = em.createNativeQuery("select i.* from interview i" +
                    " order by rand() limit " + requestCreateInterview.getQuestion());
            List<InterviewCreateSimpleDto> list = jpaResultMapper.list(q, InterviewCreateSimpleDto.class);
            return list;
//            return interviewRepository.findInterviewLimit(requestCreateInterview.getQuestion(), userSeq);
        }
        else {
            String category = requestCreateInterview.getCategory().equalsIgnoreCase("character") ? "인성" : "기술";
            JpaResultMapper jpaResultMapper = new JpaResultMapper();
            Query q = em.createNativeQuery("select i.* from Interview i" +
                    " where i.category = " + "\'" + category + "\'" +
                    " order by rand() limit " + requestCreateInterview.getQuestion());
            List<InterviewCreateSimpleDto> list = jpaResultMapper.list(q, InterviewCreateSimpleDto.class);
            return list;
//            return interviewRepository.findInterviewLimitCategory(category, requestCreateInterview.getQuestion(), userSeq);
        }
    }

    public int interviewLikesCount(Long interviewSeq){

        return interviewLikesRepository.isLikedCount(interviewSeq);

    }


    @Transactional
    public void interviewLikes(Long userSeq, Long interviewSeq) {

        InterviewLikes interviewLikes = interviewLikesRepository.isLiked(userSeq, interviewSeq);

        if(interviewLikes == null){
            interviewLikes = new InterviewLikes();
            interviewLikes.setInterview(interviewRepository.findById(interviewSeq).orElse(null));
            interviewLikes.setUserSeq(userSeq);
            interviewLikesRepository.save(interviewLikes);
        }
        else interviewLikesRepository.delete(interviewLikes);
    }

    public InterviewMemo getMemo(Long userSeq, Long interviewSeq){

        return interviewMemoRepository.findMemo(userSeq, interviewSeq);
    }


    @Transactional
    public InterviewMemo createMemo(Long userSeq, Long interviewSeq, String memo){
        InterviewMemo interviewMemo = interviewMemoRepository.findDuplicate(userSeq, interviewSeq);
        if(interviewMemo == null) interviewMemo = new InterviewMemo();
        interviewMemo.setInterview(interviewRepository.findById(interviewSeq).orElse(null));
        interviewMemo.setMemo(memo);
        interviewMemo.setUserSeq(userSeq);

        return interviewMemoRepository.save(interviewMemo);
    }

    public List<InterviewCommentResponseDto> getComment(Long interviewSeq){

        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        Query q = em.createNativeQuery("select i.*, u.username, " +
                "(select COUNT(*) from interview_comment_likes l WHERE l.interview_comment_id = i.id) AS likesCount, " +
                "(select COUNT(*) from interview_comment_likes l WHERE l.user_seq = i.user_seq AND l.interview_comment_id = i.id) AS liked " +
                "from interview_comment i right join User u on i.user_seq = u.user_seq where i.interview_seq = " + interviewSeq +
                " order by i.created_at DESC");
        List<InterviewCommentResponseDto> list = jpaResultMapper.list(q, InterviewCommentResponseDto.class);
        return list;

    }

    public InterviewComment getCommentInfo(Long commentId){
        return interviewCommentRepository.findById(commentId).orElse(null);
    }

    @Transactional
    public InterviewComment createComment(Long userSeq, Long interviewSeq, String comment){
        InterviewComment interviewComment = new InterviewComment();
        interviewComment.setInterview(interviewRepository.findById(interviewSeq).orElse(null));
        interviewComment.setCreatedAt(LocalDateTime.now());
        interviewComment.setComment(comment);
        interviewComment.setUserSeq(userSeq);

        return interviewCommentRepository.save(interviewComment);
    }

    @Transactional
    public InterviewComment updateComment(Long commentId, Long userSeq, String comment){
        InterviewComment interviewComment = interviewCommentRepository.findById(commentId).orElse(null);

        if(interviewComment == null || !Objects.equals(interviewComment.getUserSeq(), userSeq)) return null;
        interviewComment.setComment(comment);

        return interviewCommentRepository.save(interviewComment);
    }

    @Transactional
    public InterviewComment deleteComment(Long commentId, Long userSeq){
        InterviewComment interviewComment = interviewCommentRepository.findById(commentId).orElse(null);

        if(interviewComment == null || !Objects.equals(interviewComment.getUserSeq(), userSeq)) return null;

        interviewCommentLikesRepository.deleteByInterviewCommentId(commentId);
        interviewCommentRepository.deleteById(commentId);

        return interviewComment;
    }

    public int interviewCommentLikesCount(Long commentId){
        return interviewCommentLikesRepository.isLikedCount(commentId);
    }

    @Transactional
    public void interviewCommentLikes(Long userSeq, Long commentId) {

        InterviewCommentLikes interviewCommentLikes = interviewCommentLikesRepository.isLiked(userSeq, commentId);

        if(interviewCommentLikes == null){
            interviewCommentLikes = new InterviewCommentLikes();
            interviewCommentLikes.setInterviewComment(interviewCommentRepository.findById(commentId).orElse(null));
            interviewCommentLikes.setUserSeq(userSeq);
            interviewCommentLikesRepository.save(interviewCommentLikes);
        }
        else interviewCommentLikesRepository.delete(interviewCommentLikes);
    }

    @Transactional
    public void interviewSeenUpdate(List<InterviewCreateDto> interviewList, Long userSeq){
        for(InterviewCreateDto interviewCreateDto: interviewList){
            InterviewSeen interviewSeen = new InterviewSeen();
            Interview interview = interviewRepository.findById(interviewCreateDto.getInterviewSeq().longValue()).orElse(null);
            if(interview == null) continue;
            interviewSeen.setInterview(interview);
            interviewSeen.setSeenAt(LocalDateTime.now());
            interviewSeen.setUserSeq(userSeq);
            InterviewSeen duplicateSeen = interviewSeenRepository.findByInterviewUser(interview.getInterviewSeq(), userSeq);
            if(duplicateSeen != null){
                duplicateSeen.setSeenAt(LocalDateTime.now());
                interviewSeenRepository.save(duplicateSeen);
            }
            else{
                interviewSeenRepository.save(interviewSeen);
            }
        }

    }

    @Transactional
    public void updateInterviewCount(Long userSeq){

        Statistic statistic = statisticsRepository.findByUserSeq(userSeq);

        if(statistic == null){
            statistic = new Statistic();
            statistic.setUserSeq(userSeq);
            statistic.setInterviewCount(1L);
        } else{
            statistic.setInterviewCount(statistic.getInterviewCount() + 1);
        }

        statisticsRepository.save(statistic);
        badgeService.checkInterviewCount(userSeq, statistic.getInterviewCount());

    }

}
