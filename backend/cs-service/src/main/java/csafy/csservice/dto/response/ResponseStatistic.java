package csafy.csservice.dto.response;

import csafy.csservice.entity.profile.Statistic;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.concurrent.ConcurrentHashMap;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ResponseStatistic {
    private String rank1;
    private int rank2;
    private String username;
    private int exp;
    private ConcurrentHashMap<String, Integer> scores;

    public ResponseStatistic(Statistic statistic, int score){
        this.scores = statistic.getScores();
        this.exp = score;

    }
}
