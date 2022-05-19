package csafy.csservice.scheduler;

import csafy.csservice.repository.profile.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * 매일 0시(서버시간 기준) 출석체크 가능 상태로 변함
 */
@Component
@RequiredArgsConstructor
public class DailyCheckScheduler {

    private final StatisticsRepository statisticsRepository;

    @Scheduled(cron="0 0 0 * * *")
    @Transactional
    public void DailyCheck(){
        statisticsRepository.updateDailyCheck();
    }



}
