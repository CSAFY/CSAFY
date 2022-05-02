package csafy.csservice.service;

import csafy.csservice.entity.Interview;
import csafy.csservice.repository.InterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    public List<Interview> getInterviewList(){
        return interviewRepository.findAll();
    }
}
