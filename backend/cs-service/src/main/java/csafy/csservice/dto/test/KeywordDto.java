package csafy.csservice.dto.test;

import csafy.csservice.entity.test.Card;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class KeywordDto {

    // 키워드
    private String key;

    // 정답 / 오답
    private String explanation;

    public KeywordDto(Card card){
        this.key = card.getCardKey();
        this.explanation = card.getCardValue();
    }

}
