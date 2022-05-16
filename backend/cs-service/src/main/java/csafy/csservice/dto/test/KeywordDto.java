package csafy.csservice.dto.test;

import csafy.csservice.dto.UserDto;
import csafy.csservice.entity.interview.Interview;
import csafy.csservice.entity.interview.InterviewLikes;
import csafy.csservice.entity.test.Card;
import csafy.csservice.entity.test.CardLikes;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Objects;

@Data
@RequiredArgsConstructor
public class KeywordDto {

    // 키워드 Seq
    private Long keywordSeq;

    // 키워드
    private String key;

    // 정답 / 오답
    private String explanation;

    private boolean isLiked; // 나만의 카드집 여부

    public KeywordDto(Card card){
        this.key = card.getCardKey();
        this.explanation = card.getCardValue();
        this.keywordSeq = card.getCardSeq();
    }

    public KeywordDto(Card card, UserDto userDto){
        this.key = card.getCardKey();
        this.explanation = card.getCardValue();
        this.keywordSeq = card.getCardSeq();

        // 좋아요 여부
        if(card.getCardLikes() == null) {
            this.isLiked = false;
        } else {
            this.isLiked = false;
            for(CardLikes cardLikes : card.getCardLikes()){
                if(Objects.equals(cardLikes.getUserSeq(), userDto.getUser_seq())){
                    this.isLiked = true;
                    break;
                }
            }
        }
    }


}
