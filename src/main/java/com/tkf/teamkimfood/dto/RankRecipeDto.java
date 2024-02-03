package com.tkf.teamkimfood.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.time.LocalDateTime;

//메인에서 표시할 정보 담기
@Data
public class RankRecipeDto {

    private Long id;
    private String title;
    private long score;
    private String imgUrl;
    private String nickName;
    private LocalDateTime writeDate;
    private long totalScore;

    //메인페이지에서 조회
    @QueryProjection
    public RankRecipeDto(Long id, String title, long score, String imgUrl, String nickName, LocalDateTime writeDate) {
        this.id = id;
        this.title = title;
        this.score = score;
        this.imgUrl = imgUrl;
        this.nickName = nickName;
        this.writeDate = writeDate;
    }


}
