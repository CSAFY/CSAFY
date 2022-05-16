package csafy.csservice.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
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

    @GetMapping("/test/quizsample")
    public ResponseEntity unitySampleTestQuiz() {

        Random random = new Random();
        QuizEntity quizTestEntity = new QuizEntity();
        if (random.nextFloat() < 0.25) {
            quizTestEntity.setQuiz("이 질문의 답은 1이다");
            quizTestEntity.setAnswer("1");
        } else if(random.nextFloat() < 0.5){
            quizTestEntity.setQuiz("이 질문의 답은 2이다");
            quizTestEntity.setAnswer("2");
        } else if(random.nextFloat() < 0.75) {
            quizTestEntity.setQuiz("이 질문의 답은 3이다");
            quizTestEntity.setAnswer("3");
        } else {
            quizTestEntity.setQuiz("이 질문의 답은 4이다");
            quizTestEntity.setAnswer("4");
        }

        return ResponseEntity.ok(quizTestEntity);
    }

    @Data
    static class QuizTestEntity {
        private String quiz;
        private String answer;
    }

    @GetMapping("/test/quizsample2")
    public ResponseEntity unitySampleQuiz2() {

        Random random = new Random();
        QuizEntity2 quizEntity = new QuizEntity2();
        quizEntity.setKey("http");
        quizEntity.setValue("웹을 기준으로 브라우저와 서버 간에 데이터를 주고받기 위한 방식");
        return ResponseEntity.ok(quizEntity);
    }

    @Data
    static class QuizEntity2 {
        private String key;
        private String value;
    }

    // 샘플2에서 받는거

    @GetMapping("/test/quizsample3")
    public ResponseEntity unitySampleQuiz3() {

        List<QuizEntity3> cards = new ArrayList<>();
        cards.add(new QuizEntity3("http" , "웹을 기준으로 브라우저와 서버 간에 데이터를 주고받기 위한 방식111"));
        cards.add(new QuizEntity3("http" , "웹을 기준으로 브라우저와 서버 간에 데이터를 주고받기 위한 방식222"));
        cards.add(new QuizEntity3("http" , "웹을 기준으로 브라우저와 서버 간에 데이터를 주고받기 위한 방식333"));
        cards.add(new QuizEntity3("http" , "웹을 기준으로 브라우저와 서버 간에 데이터를 주고받기 위한 방식444"));
        cards.add(new QuizEntity3("http" , "웹을 기준으로 브라우저와 서버 간에 데이터를 주고받기 위한 방식555"));

        return ResponseEntity.ok(cards);
    }

    @Data
    @AllArgsConstructor
    static class QuizEntity3 {
        private String key;
        private String value;
    }

}
