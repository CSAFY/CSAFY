package csafy.csservice.repository.test;

import csafy.csservice.entity.test.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    @Query(value = "select c.* from Card c where c.category =:category order by rand() limit :num"
            , nativeQuery = true)
    List<Card> findCardByCategoryLimit(@Param("category") String category, @Param("num") int num);

    @Query(value = "select * from Card c where upper(c.card_key) like upper(concat('%', concat(:keyword, '%')))", nativeQuery = true)
    List<Card> searchCardByKeyword(@Param("keyword") String keyword);

    @Query("select c from Card c join CardLikes cl on c.cardSeq = cl.card.cardSeq where cl.userSeq = :userSeq")
    List<Card> findLikedCards(@Param("userSeq") Long userSeq);
}