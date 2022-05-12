import React from 'react';

// STYLED
import styled from 'styled-components';

const TermsWrapper = styled.div`
  width: 100%;
  height: 8000px;
  padding-bottom: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TermsContent = styled.div`
  width: 1232px;
  height: 100%;
  position: relative;
`;
const Content = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  font-size: 30px;
  font-weight: 600;
`;

function Terms() {
  return (
    <TermsWrapper>
      <TermsContent>
        <h1
          style={{
            fontSize: '50px',
            marginTop: '100px',
            marginBottom: '100px',
          }}
        >
          {' '}
          C;SAFY 이용 약관
        </h1>
        <Content>제 1조 [목적]</Content>
        <div>
          이 이용약관(이하 '약관'이라 합니다.)은 Hotsix-Turtles(이하 '회사'라
          합니다.)가 제공하는 C;SAFY 학습 서비스(이하 '서비스'라 합니다.)를
          이용고객 (이하 '회원'이라 합니다.)이 이용함에 있어서 회사와 회원과의
          권리, 의무 및 책임사항, 기타 필요한 사항을 구체적으로 규정함을
          목적으로 합니다.
        </div>
        <Content>제2조 [용어의 정의]</Content>
        <div>
          1. 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          <ul>
            <li>
              서비스 : 구현되는 단말기와 상관없이 회원 혹은 웹사이트 방문자가
              이용할 수 있는 백준 온라인 저지 서비스를 의미합니다.
            </li>
            <li>
              회원 : 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을
              체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
            </li>
            <li>
              이용계약 : 이 약관을 포함하여 서비스 이용과 관련하여 회사와 회원
              간에 체결하는 모든 계약을 말합니다.
            </li>
            <li>
              해지 : 회사 또는 회원이 이용계약을 해약하는 것을 말합니다. 문제 :
              서비스에 업로드되어있는 문제를 말합니다.
            </li>
            <li>
              강의 : 서비스에서 등록받아 진행하는 오프라인 강의를 말합니다.
            </li>
            <li>
              유료서비스 : 회사가 유료로 제공하는 각종 온라인디지털콘텐츠 및
              제반 서비스를 의미합니다.
            </li>
          </ul>
          2. 이 약관에서 사용하는 용어 중 제1항에서 정하지 아니한 것은 관계 법령
          및 서비스 별 안내에서 정하는 바에 따르며, 그 외에는 일반 관례에
          따릅니다.
        </div>
        <Content>제3조 [약관 효력 및 변경]</Content>
        <div>
          <p>
            1. 이 약관은 그 내용을 회사의 웹사이트에 게시하거나 기타의 방법으로
            회원에게 공지함으로 효력이 발생합니다.
          </p>
          <p>
            2. 회사는 약관의규제에관한법률,
            정보통신망이용촉진및정보보호등에관한법률(이하 정보통신망법) 등
            관련법을 위배하지 않는 범위에서 사전 고지 없이 이 약관의 내용을
            변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는
            통지함으로 효력이 발생됩니다.
          </p>
          <p>
            3. 회원은 정기적으로 웹사이트에 방문하여 약관의 변경사항을
            확인하여야 합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는
            회원의 피해는 회사에서 책임지지 않습니다. 단 회원에게 불리한 약관의
            개정의 경우에는 공지 외에 일정기간 전자우편, 쪽지, 로그인시 동의양식
            등의 전자적 수단을 통해 따로 명확히 통지하도록 합니다.
          </p>
          <p>
            4. 회원은 변경된 약관에 동의하지 않을 경우 회원탈퇴를 요청할 수
            있습니다. 변경된 약관의 효력발생일 이후에도 서비스를 계속 이용할
            경우 약관의 변경사항에 동의한 것으로 간주됩니다.
          </p>
        </div>
        <Content>제4조 [약관 외 준칙]</Content>
        <div>
          회사는 필요한 경우 서비스 내의 개별항목에 대하여 개별약관 또는
          운영원칙(이하 '서비스 별 안내'라 합니다.)를 정할 수 있으며, 회원은 각
          서비스 별 안내에 대해 회원가입과 동시에 동의한 것으로 간주합니다. 본
          약관과 서비스 별 안내의 내용이 상충되는 경우에는 서비스 별 안내의
          내용을 우선하여 적용합니다.
        </div>
        <Content> 제5조 [이용계약 체결]</Content>
        <div>
          <p>
            1. 이용계약은 회원이 되고자 하는 자(이하 가입신청자)가 약관의 내용에
            대하여 동의를 한 다음 회원가입신청을 하고 회사가 이러한 신청에
            대하여 승낙함으로써 체결됩니다.
          </p>
          <p>
            2. 회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로
            합니다. 다만, 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을
            하지 않거나 사후에 이용계약을 해지할 수 있습니다.
          </p>
          <ul>
            <li>
              가입 신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는
              경우, 단 회사의 회원 재가입 승낙을 얻은 경우에는 예외로 함.
            </li>
            <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
            <li>
              허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은
              경우
            </li>
            <li>
              14세 미만 아동이 법정대리인(부모 등)의 동의를 얻지 아니한 경우
            </li>
            <li>
              이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반
              사항을 위반하며 신청하는 경우
            </li>
          </ul>
          <p>
            3. 제1항에 따른 신청에 있어 회사는 회원의 종류에 따라 전문기관을
            통한 실명확인 및 본인인증을 요청할 수 있습니다.
          </p>
          <p>
            4. 회사는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가
            있는 경우에는 승낙을 유보할 수 있습니다.
          </p>
          <p>
            5. 제2항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한
            경우, 회사는 원칙적으로 이를 가입신청자에게 알리도록 합니다.
          </p>
          <p>
            6. 이용계약의 성립 시기는 회사가 가입완료를 신청절차 상에서 표시한
            시점으로 합니다.
          </p>
          <p>
            7. 회사는 회원에 대해 회사정책에 따라 등급별로 구분하여 이용시간,
            이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.
          </p>
          <p>
            8. 회사는 회원에 대하여 영화및비디오물의진흥에관한법률 및
            청소년보호법등에 따른 등급 및 연령 준수를 위해 이용제한이나 게시물
            삭제, 등급별 제한을 할 수 있습니다.
          </p>
        </div>
        <Content>제6조 [회원정보의 변경]</Content>
        <div>
          <p>
            1. 회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를
            열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한
            이메일은 수정이 불가능합니다.
          </p>
          <p>
            2. 회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로
            수정을 하거나 전자우편 기타 방법으로 회사에 대하여 그 변경사항을
            알려야 합니다.
          </p>
          <p>
            3. 제2항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여
            회사는 책임지지 않습니다.
          </p>
        </div>
        <Content>제7조 [개인정보보호 의무]</Content>
        <div>
          회사는 정보통신망법 등 관계 법령이 정하는 바에 따라 회원의 개인정보를
          보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및
          회사의 개인정보취급방침이 적용됩니다. 다만, 회사의 공식 사이트 이외의
          링크된 사이트에서는 회사의 개인정보취급방침이 적용되지 않습니다.
        </div>
        <Content>
          제8조 [회원의 아이디 및 비밀번호, 이메일 관리에 대한 의무]
        </Content>
        <div>
          <p>
            1. 회원의 아이디와 비밀번호 그리고 이메일에 관한 관리책임은 회원에게
            있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.
          </p>
          <p>
            2. 회사는 회원의 아이디가 개인정보 유출 우려가 있거나, 반사회적 또는
            미풍양속에 어긋나거나 회사 및 회사의 운영자로 오인한 우려가 있는
            경우, 해당 아이디의 이용을 제한할 수 있습니다.
          </p>
          <p>
            3. 회원은 아이디 및 비밀번호가 도용되거나 제3자가 사용하고 있음을
            인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야
            합니다.
          </p>
          <p>
            4. 제3항의 경우에 해당 회원이 회사에 그 사실을 통지하지 않거나,
            통지한 경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여
            회사는 책임지지 않습니다.
          </p>
        </div>
        <Content> 제9조 [회원에 대한 통지]</Content>
        <div>
          <p>
            1. 회사가 회원에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한
            서비스 내 전자우편주소, 전자쪽지 등으로 할 수 있습니다.
          </p>
          <p>
            2. 회사는 회원 전체에 대한 통지의 경우 7일 이상 회사의 게시판에
            게시함으로써 제1항의 통지에 갈음할 수 있습니다.
          </p>
        </div>
        <Content> 제10조 [회사의 의무]</Content>
        <div>
          <p>
            1. 회사는 관련법과 이 약관이 금지하거나 미풍양속에 반하는 행위를
            하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을
            다하여 노력합니다.
          </p>
          <p>
            2. 회사는 회원이 안전하게 서비스를 이용할 수 있도록
            개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며
            개인정보취급방침을 공시하고 준수합니다.
          </p>
          <p>
            3. 회사는 서비스이용과 관련하여 회원으로부터 제기된 의견이나 불만이
            정당하다고 인정할 경우에는 이를 처리하여야 합니다. 회원이 제기한
            의견이나 불만사항에 대해서는 1:1문의, 게시판, 전자우편 등을 통하여
            회원에게 처리과정 및 결과를 전달합니다.
          </p>
        </div>
        <Content>제11조 [회원의 의무]</Content>
        <div>
          <p>1. 회원은 다음 행위를 하여서는 안 됩니다.</p>
          <ul>
            <li>신청 또는 변경 시 허위내용의 등록</li>
            <li>타인의 정보도용</li>
            <li>회사가 게시한 정보의 변경</li>
            <li>
              회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는
              게시
            </li>
            <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
            <li>
              회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
            </li>
            <li>
              외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는
              정보를 서비스에 공개 또는 게시하는 행위
            </li>
            <li>회사의 동의 없이 영리를 목적으로 서비스를 사용하는 행위</li>
          </ul>
          <p>
            2. 회원은 관계법, 이 약관의 규정, 이용안내 및 서비스와 관련하여
            공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타
            회사의 업무에 방해되는 행위를 하여서는 안 됩니다.
          </p>
        </div>
        <Content>제12조 [서비스의 제공]</Content>
        <div>
          <p>1. 회사는 회원에게 아래와 같은 서비스를 제공합니다.</p>
          <ul>
            <li>
              Computer Science(이하 CS) 관련 정보를 관련 유튜브 영상으로 시청할
              수 있는 서비스
            </li>
            <li>CS 관련 정보를 키워드 단위로 학습할 수 있는 서비스</li>
            <li>4지선다 문제를 제공하고, 제출한 문제를 채점하는 서비스</li>
            <li>OX 문제를 제공하고, 정답을 확인할 수 있는 서비스</li>
            <li>
              풀어본 문제에 대해 취약 분야를 분석하여 결과를 제공하는 서비스
            </li>
          </ul>
          <p>
            2. 서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한
            연중무휴, 1일 24시간 운영을 원칙으로 합니다. 회사의 책임이 없는
            기술적 문제가 발생하거나 정기점검을 하는 경우는 예외로 합니다.
          </p>
          <p>
            3. 회사는 일부 서비스의 이용 가능 시간을 별도로 정할 수 있습니다. 이
            경우 서비스 이용안내를 통해 공지합니다.
          </p>
        </div>
        <Content> 제13조 [유료 서비스 거래 규정]</Content>
        <div>
          <p>
            1. 별도로 표시된 유료 서비스를 제외한 모든 서비스는 회원들에게
            무료로 제공됩니다.
          </p>
          <p>
            2. 유료 서비스의 이용 요금 및 결제 방식은 해당 서비스에 명시되어
            있는 규정에 따릅니다.
          </p>
          <p>
            3. 회원이 현금 및 사이버머니 등 거래에 필요한 내용을 확인하여 이에
            승낙하면 거래가 성립된 것으로 간주합니다.
          </p>
        </div>
        <h2>제14조 [관계 법령상 환불 정책]</h2>
        <div>
          <p>
            1. 회사의 본 약관상 환불규정 등은 약관의 규제에 관한 법률, 온라인
            디지털콘텐츠산업 발전법, 전자상거래 등에서의 소비자보호에 관한 법률
            등을 준수합니다.
          </p>
          <p>
            2. 전 항의 관계법령에 따른 소비자의 청약철회가 불가능한 경우는
            다음과 같습니다.
          </p>
          <ul>
            <li>
              청약철회가 불가능한 콘텐츠에 대한 사실을 표시사항에 포함한 경우
            </li>
            <li>시용상품을 제공한 경우</li>
            <li>한시적 또는 일부 이용 등의 방법을 제공한 경우</li>
          </ul>
        </div>
        <Content> 제15조 [서비스 제공의 변경 및 중지]</Content>
        <div>
          <p>
            1. 회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및
            운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에
            특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.
          </p>
          <p>
            2. 회사는 긴급한 시스템 점검, 증설 및 교체, 설비의 장애, 서비스
            이용의 폭주, 정전, 국가비상사태, 천재지변 등 부득이한 사유가 발생한
            경우 사전 예고 없이 일시적으로 서비스를 중지할 수 있습니다.
          </p>
        </div>
        <Content>제16조 [회원의 게시물 등]</Content>
        <div>
          <p>
            1. 게시물은 회원이 서비스를 이용하면서 게시한 글, 사진, 각종 파일과
            링크, 디지털 콘텐츠 등을 말합니다.
          </p>
          <p>
            2. 회원이 서비스에 등록하는 게시물 등으로 인하여 본인 또는 타인에게
            손해나 기타 문제가 발생하는 경우 회원은 이에 대한 전적인 책임을 지게
            되며, 회사는 이에 대하여 어떤 경우에도 책임을 지지 않습니다.
          </p>
          <p>
            3. 회사는 다음 각 호에 해당하는 게시물 등을 회원의 사전 동의 없이
            임시게시 중단, 수정, 삭제, 이동 또는 등록 거부 등의 관련 조치를 취할
            수 있습니다.
          </p>
          <ul>
            <li>
              다른 회원 또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는
              내용인 경우
            </li>
            <li>
              공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우
            </li>
            <li>불법복제 또는 해킹을 조장하는 내용인 경우</li>
            <li>영리를 목적으로 하는 광고일 경우</li>
            <li>범죄와 결부된다고 객관적으로 인정되는 내용일 경우</li>
            <li>
              다른 이용자 또는 제 3자의 저작권 등 기타 권리를 침해하는 내용인
              경우
            </li>
            <li>
              사적인 정치적 판단이나 종교적 견해의 내용으로 회사가 서비스 성격에
              부합하지 않는다고 판단하는 경우
            </li>
            <li>
              회사에서 규정한 게시물 원칙에 어긋나거나, 게시판 성격에 부합하지
              않는 경우
            </li>
            <li>
              게시물이 내용의 질 뿐만 아니라 화질 등에 있어 회사가 정한 규정을
              만족하지 못한 경우
            </li>
            <li>기타 관계법령에 위배된다고 판단되는 경우</li>
          </ul>
          <p>
            4. 회사는 게시물 등에 대하여 제3자로부터 명예훼손, 지적재산권 등의
            권리 침해를 이유로 게시중단 요청을 받은 경우 이를 임시로 게시를 중단
            할 수 있으며, 이의를 제기한 자와 게시물 등록자 간에 소송, 합의 등을
            통해 당해 게시물에 관한 법적 문제가 종결된 후 이를 근거로 회사에
            신청이 있는 경우에만 상기 임시로 게시가 중단된 게시물은 다시 게시될
            수 있습니다.
          </p>
          <p>
            5. 회원이 이용계약해지를 한 경우 회원이 등록한 게시물은 자동
            삭제되지 않으며 이용계약 해지 전에 직접 삭제를 하거나 요청을 할 경우
            회사는 요청한 게시물을 삭제합니다.
          </p>
        </div>
        <Content>제17조 [게시물에 대한 저작권]</Content>
        <div>
          <p>
            1. 회사가 작성한 게시물 또는 저작물에 대한 저작권 기타 지적재산권은
            회사에 귀속합니다.
          </p>
          <p>
            2. 회원이 서비스 내에 게시한 게시물의 저작권은 원칙적으로 게시한
            회원에게 귀속됩니다. 단, 회사는 서비스의 운영, 전시, 전송, 배포,
            홍보 등의 목적으로 회원의 별도의 허락 없이 무상으로 회원이 등록한
            게시물을 사용할 수 있습니다.
          </p>
          <p>
            3. 회원이 올린 디지털 콘텐츠가 회원의 동의 없이 타인에 의해 무단,
            불법 복제되어 회원뿐 아니라 회사의 이익에 상충할 경우 회사는 회원을
            대리해 저작권을 행사할 수 있습니다. 단, 이 경우 회사는 회원에게
            개별적 동의를 구합니다.
          </p>
          <p>
            4. 회사는 본 조 제 2항 이외의 목적으로 회원의 게시물을 사용하고자
            하는 경우 사전에 회원의 동의를 얻어 사용합니다.
          </p>
        </div>
        <Content>제18조 [정보의 제공]</Content>
        <div>
          <p>
            1. 회사는 회원에게 서비스 이용에 필요가 있다고 인정되는 각종 정보에
            대해서 전자우편이나 서신, 우편, SMS, 전화 등의 방법으로 회원에게
            제공할 수 있습니다.
          </p>
          <p>
            2. 회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로
            회원의 동의 하에 관련 법령에 따라 추가적인 개인 정보를 수집할 수
            있습니다.
          </p>
        </div>
        <Content>제19조 [계약해제, 해지 등]</Content>
        <div>
          <p>
            1. 회원은 언제든지 1:1문의 등을 통하여 이용계약 해지 신청을 할 수
            있으며, 회사는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야
            합니다.
          </p>
          <p>
            2. 회원이 계약을 해지할 경우, 관련법 및 개인정보취급방침에 따라
            회사가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든
            데이터는 소멸됩니다.
          </p>
          <p>
            3. 회원이 계약을 해지하는 경우, 회원이 작성한 게시물의 원본은
            삭제됩니다.
          </p>
        </div>
        <Content>제20조 [이용제한 등]</Content>
        <div>
          <p>
            1. 회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인
            운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 서비스
            이용을 제한할 수 있습니다.
          </p>
          <p>
            2. 회사는 전항에도 불구하고, 주민등록법을 위반한 명의도용 및
            결제도용, 저작권법 및 컴퓨터프로그램보호법을 위반한 불법프로그램의
            제공 및 운영방해, 정보통신망법을 위반한 불법통신 및 해킹,
            악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한
            경우에는 즉시 영구이용정지를 할 수 있습니다. 본 항에 따른
            영구이용정지 시 서비스 이용을 통해 획득한 수익 등 기타 혜택 등도
            모두 소멸되며, 회사는 이에 대해 별도로 보상하지 않습니다.
          </p>
          <p>
            3. 회사는 회원이 계속해서 1년 이상 로그인하지 않는 경우, 회원정보의
            보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다.
          </p>
          <p>
            4. 회사는 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은
            이용제한정책 및 개별 서비스상의 운영정책에서 정하는 바에 의합니다.
          </p>
          <p>
            5. 본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는 경우에는
            회사는 그 사유 및 제한기간 등을 회원에게 알려야 합니다.
          </p>
          <p>
            6. 회원은 본 조에 따른 이용제한 등에 대해 회사가 정한 절차에 따라
            이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는
            경우 회사는 즉시 서비스의 이용을 재개합니다.
          </p>
        </div>
        <Content>제21조 [부정이용 금지 및 차단]</Content>
        <div>
          <p>1. 회사는 다음 각호에 해당하는 경우를 부정 이용행위로 봅니다.</p>
          <ul>
            <li>동일한 계정으로 2대 이상의 PC에서 동시접속이 발생하는 경우</li>
            <li>
              동일한 계정으로 다수의 PC 또는 IP에서 서비스를 이용하는 경우
            </li>
            <li>자신의 계정의 서비스를 타인이 이용하도록 하는 경우</li>
            <li>
              자신의 계정의 서비스를 타인에게 판매, 대여, 양도하는 행위 및 이를
              광고하는 행위
            </li>
            <li>
              서비스 이용 중, 복제프로그램을 실행하는 경우 또는 녹화를 하거나
              시도하는 경우
            </li>
          </ul>
          <p>
            2. 회사는 전항에 따른 부정 이용자가 발견 되었을 경우, 다음 각호에
            따른 조치를 취할 수 있습니다.
          </p>
          <ul>
            <li>[1차 발견 시] 전자우편, 쪽지, 팝업창을 통하여 경고합니다.</li>
            <li>
              [2차 발견 시] 강제 탈퇴 처리되며 회사의 법률 대리인을 통한
              고발조치와 민사소송을 진행하게 됩니다.
            </li>
          </ul>
          <p>
            3. 회원은 전항 제2호의 조치를 이유로, 서비스 이용기간의 연장을
            요구할 수 없습니다.
          </p>
          <p>
            4. 회원은 회사로부터의 본 조 제2항의 조치에 이의가 있는 경우, 회사의
            법률 대리인을 통해 소명할 수 있습니다.
          </p>
          <p>5. 부정이용 식별방법 및 차단</p>
          <ul>
            <li>
              회사는 회원의 서비스 이용 중에 수집ㆍ확인된 IP정보 등의 자료를
              토대로, 서버를 통하여 부정이용 여부를 분류ㆍ확인합니다.
            </li>
            <li>
              회사는 이용자가 서비스 이용 중에 복제프로그램을 실행시키거나
              동일한 계정으로 동시 접속을 하는 경우, 서비스 이용 접속을 강제로
              종료 시킵니다.
            </li>
          </ul>
        </div>
        <Content>제22조 [면책]</Content>
        <div>
          <p>
            1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
            제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
          </p>
          <p>
            2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는
            책임을 지지 않습니다.
          </p>
          <p>
            3. 회사는 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도,
            정확성 등의 내용에 관하여는 책임을 지지 않습니다.
          </p>
          <p>
            4. 회사는 회원 간 또는 회원과 제3자 상호간에 서비스를 매개로 하여
            거래 등을 한 경우에는 책임이 면제됩니다.
          </p>
          <p>
            5. 회사는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한
            규정이 없는 한 책임을 지지 않습니다.
          </p>
          <p>
            6. 회사는 CP가 제공하거나 회원이 작성하는 등의 방법으로 서비스에
            게재된 정보, 자료, 사실의 신뢰도, 정확성 등에 대해서는 보증을 하지
            않으며 이로 인해 발생한 회원의 손해에 대하여는 책임을 부담하지
            아니합니다.
          </p>
        </div>
        <Content>제23조 [분쟁의 해결]</Content>
        <div>
          본 약관은 대한민국법령에 의하여 규정되고 이행되며, 서비스 이용과
          관련하여 회사와 회원간에 발생한 분쟁에 대해서는 서울중앙지방법원을
          합의관할로 합니다.
        </div>
        <Content> 제24조 [규정의 준용]</Content>
        <div>
          본 약관에 명시되지 않은 사항에 대해서는 관련법령에 의하고, 법에
          명시되지 않은 부분에 대하여는 관습에 의합니다.
        </div>
        <Content>부칙</Content>
        <div>본 약관은 2022년 5월 10일부터 적용됩니다.</div>
      </TermsContent>
    </TermsWrapper>
  );
}

export default Terms;
