package csafy.csservice.dto.test;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class OXDto {

    // 키워드
    private String key;

    // 카테고리
    private String category;

    // 정답 / 오답
    private String explanation;

    // O = 0, X = 1
    private int answer;

}
