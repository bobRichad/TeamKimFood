package com.tkf.teamkimfood.domain.prefer;

import com.tkf.teamkimfood.domain.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberPreference {

    @Id @Column(name = "mpreference_id")
    private Long id;
    private String Situation;//상황 : 혼밥,연인, 가족 등등
    private String foodStuff;//음식재료 : 육류 어류 등등
    private String foodNationType;//음식타입 : 한식 중식 일식 등

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
