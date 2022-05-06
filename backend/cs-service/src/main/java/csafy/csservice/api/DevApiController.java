package csafy.csservice.api;

import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Random;

@Controller
public class DevApiController {

    @GetMapping("/unity/quizsample")
    public ResponseEntity unitySampleQuiz() {

        Random random = new Random();
        QuizEntity quizEntity = new QuizEntity();
        if (random.nextFloat() < 0.5) {
            quizEntity.setQuiz("이 질문의 답은 O이다");
            quizEntity.setAnswer("O");
        } else {
            quizEntity.setQuiz("이 질문의 답은 X이다");
            quizEntity.setAnswer("X");
        }
        return ResponseEntity.ok(quizEntity);
    }

    @Data
    static class QuizEntity {
        private String quiz;
        private String answer;
    }

}
