package com.tkf.teamkimfood.domain;

import com.tkf.teamkimfood.domain.oauth.OAuthProvider;
import com.tkf.teamkimfood.domain.prefer.MemberPreference;
import com.tkf.teamkimfood.domain.status.MemberRole;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class Member {

    @Id @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;

    @Column(unique = true)
    private String email;

    private String nickname;

    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private MemberRole memberRole;

    @ColumnDefault("0")
    private int grade;

//    private boolean memberRecommend = false; 추후 랭킹관련 추가 예정
//    private boolean recipeRecommend = false; 추후 랭킹관련 추가 예정
    //멤버 레시피 갯수->01.15 : 따로 저장 할 필요 없이 findAll이후 List.size()해버리면 된다.
//    @ColumnDefault("0")
//    private int stack;

    private LocalDateTime joinedDate;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Magazine> magazines = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Rank rank;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private MemberPreference memberPreference;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FoodFile> foodFiles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Recipe> recipes = new ArrayList<>();

    //Oauth
    private OAuthProvider oAuthProvider;


    //여기를 통해 데이터 넣으세용(id는 테스트 중에 멤버가 없을시 넣어서 해주시고 완료시 제거해주세요 테스트용으로)
    @Builder
    public Member(String name, String password, String email, String nickname, String phoneNumber, MemberRole memberRole, LocalDateTime joinedDate, MemberPreference memberPreference, OAuthProvider oAuthProvider) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.memberRole = memberRole;
        this.joinedDate = joinedDate;
        this.memberPreference = memberPreference;
        this.oAuthProvider = oAuthProvider;
    }

    // 레시피 작성 횟수 관련 - 다른곳으로 뺄 예정


}
