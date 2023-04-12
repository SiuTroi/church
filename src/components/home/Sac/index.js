import { Link } from "react-router-dom";
import "./Sac.scss";

const sacListArray = [
  {
    title: "Câu chuyện đức tin",
    img: "https://httlsaigon.org/wp-content/uploads/2023/04/Cai-gia-cua-su-hy-sinh-2-996x550.jpg",
    subTitle: "Cái giá của sự hy sinh",
    children: [
      {
        childrenTitle: "Thế nào là được cứu?",
        childrenImg: "https://httlsaigon.org/wp-content/uploads/2023/03/The-nao-la-duoc-cuu-2-120x120.jpg",
      },
      {
        childrenTitle: "Đừng lên án người khác",
        childrenImg: "https://httlsaigon.org/wp-content/uploads/2023/03/Guong-soi-22-1-120x120.jpg",
      },
    ]
  },
  {
    title: "GIẢI ĐÁP THẮC MẮC",
    img: "https://httlsaigon.org/wp-content/uploads/2023/04/split-996x550.jpg",
    subTitle: `“Cái giằm xóc”`,
    children: [
      {
        childrenTitle: "Trái cấm có phải là trái táo?",
        childrenImg: "https://httlsaigon.org/wp-content/uploads/2023/03/337265118_3191941914429949_1005202155752140442_n-120x120.jpg",
      },
      {
        childrenTitle: "Kinh Thánh dạy gì về việc làm?",
        childrenImg: "https://httlsaigon.org/wp-content/uploads/2023/03/335022981_758701648830588_6769805879255612619_n-120x120.jpg",
      },
    ]
  },
  {
    title: "TÂM VẤN CƠ ĐỐC",
    img: "https://httlsaigon.org/wp-content/uploads/2023/03/giau-co-va-noi-tieng-996x550.jpg",
    subTitle: `Cơ Đốc nhân khao khát làm giàu và nổi tiếng có gì sai không?`,
    children: [
      {
        childrenTitle: "Chủ động tìm người yêu hay chờ Chúa đem đến?",
        childrenImg: "https://httlsaigon.org/wp-content/uploads/2023/03/chu-dong-tim-nguoi-yeu-120x120.jpg",
      },
      {
        childrenTitle: "Cơ Đốc nhân và việc ăn kiêng",
        childrenImg: "https://httlsaigon.org/wp-content/uploads/2023/03/Tam-van-Co-Doc-1-120x120.jpg",
      },
    ]
  },
];

function Sac() {
  return (
    <section className="container sac">
      <div className="sac-container">
        {sacListArray.map((sacItem, index) => (
          <div className="sac-item" key={index}>
            <h1>{sacItem.title}</h1>
            <img src={sacItem.img} alt="" />
            <h3>{sacItem.subTitle}</h3>

            {sacItem.children.map((children, childrenIndex) => (
              <div key={childrenIndex}>
                <div className="boundary-line"></div>
                <div className="sac-item-content">
                  <img src={children.childrenImg} alt="" />
                  <h4>
                    <Link to={`/`}>{children.childrenTitle}</Link>
                  </h4>
                </div>
              </div>
            ))}
            <div className="boundary-line"></div>
            <Link to={`/`}>
              Xem thêm <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sac;
