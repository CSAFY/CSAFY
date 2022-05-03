package csafy.csservice.service;

import csafy.csservice.client.UserServiceClient;
import csafy.csservice.dto.interview.InterviewDto;
import csafy.csservice.dto.request.RequestCreateInterview;
import csafy.csservice.entity.interview.*;
import csafy.csservice.repository.interview.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private final UserServiceClient userServiceClient;

    public List<Interview> getInterviewList(String category){
        if(category.equalsIgnoreCase("all")){
            return interviewRepository.findAll();
        }
        else {
            category = category.equalsIgnoreCase("character") ? "인성" : "기술";
            return interviewRepository.findCategory(category);
        }
    }

    public List<InterviewDto> createInterviewList(RequestCreateInterview requestCreateInterview, Long userSeq){
        if(requestCreateInterview.getCategory().equalsIgnoreCase("all")){
            return interviewRepository.findInterviewLimit(requestCreateInterview.getQuestion(), userSeq);
        }
        else {
            String category = requestCreateInterview.getCategory().equalsIgnoreCase("character") ? "인성" : "기술";
            return interviewRepository.findInterviewLimitCategory(category, requestCreateInterview.getQuestion(), userSeq);
        }
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


    @Transactional
    public InterviewMemo createMemo(Long id, Long interviewSeq, String memo){
        InterviewMemo interviewMemo = new InterviewMemo();
        interviewMemo.setInterview(interviewRepository.findById(interviewSeq).orElse(null));
        interviewMemo.setMemo(memo);
        interviewMemo.setUserSeq(id);

        return interviewMemoRepository.save(interviewMemo);
    }

    @Transactional
    public InterviewComment createComment(Long userSeq, Long interviewSeq, String comment){
        InterviewComment interviewComment = interviewCommentRepository.findDuplicate(userSeq, interviewSeq);

        if(interviewComment == null) interviewComment = new InterviewComment();
        interviewComment.setInterview(interviewRepository.findById(interviewSeq).orElse(null));
        interviewComment.setCreatedAt(LocalDateTime.now());
        interviewComment.setComment(comment);
        interviewComment.setUserSeq(userSeq);

        return interviewCommentRepository.save(interviewComment);
    }

    @Transactional
    public InterviewComment updateComment(Long commentId, Long userSeq, String comment){
        InterviewComment interviewComment = interviewCommentRepository.findById(commentId).orElse(null);

        if(!Objects.equals(interviewComment.getUserSeq(), userSeq)) return null;
        interviewComment.setComment(comment);

        return interviewCommentRepository.save(interviewComment);
    }

    @Transactional
    public InterviewComment deleteComment(Long commentId, Long userSeq){
        InterviewComment interviewComment = interviewCommentRepository.findById(commentId).orElse(null);

        if(!Objects.equals(interviewComment.getUserSeq(), userSeq)) return null;


        interviewCommentRepository.deleteById(commentId);

        return interviewComment;
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

}
