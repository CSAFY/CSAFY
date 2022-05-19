package csafy.csservice.repository.test;

import csafy.csservice.entity.test.CardLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CardLikesRepository extends JpaRepository<CardLikes, Long> {

    @Query("select c from CardLikes c where c.userSeq =:userSeq and c.card.cardSeq =:cardSeq")
    CardLikes isLiked(@Param("userSeq") Long userSeq, @Param("cardSeq") Long cardSeq);
}
