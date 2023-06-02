import { useEffect } from "react";
import "./Introduce.css"
import { useLocation } from "react-router-dom";
import { useHomeSeo } from "../../../hooks/useHomeSeo";
function Introduce({ setLocation }) {
    const { homeSite } = useHomeSeo();
    return ( <section className="introduce-bg">
        <div className="container introduce-wrapper">
            <div className="introduce-content">
                <h2>Giới Thiệu</h2>
                <p>Kính chào quý tôi con Chúa và quý độc giả đang truy cập vào mạng lưới Hội Thánh Aspire Viet Nam Baptist Cảm ơn quý vị đã đến trang mang của chúng tôi.</p> <br />

                <p>Thật rất vui được giới thiệu về Hội Thánh của chúng tôi đến với quý vị.</p> <br />

                <p>Thành lập vào tháng 10/2022 dưới sự hỗ trợ của Aspre Church San Marco, Chúng tôi là những người cùng chung niềm tin nơi Chúa Giê-xu Christ, sống và thực thi sứ mạng mà Chúa đặt để tiễn đời sống của mình.</p> <br />

                <p>Giữa một quốc gia đa văn hoá, đa chủng tộc, đa ngôn ngữ và đa tôn giáo chúng tôi ao ước giữ được nền văn hoá của người Việt, được sống và có những mối liên hệ chặt chẽ với cộng đồng người Việt tại Hoa Kỳ.</p> <br />

                <p>
                    Sứ mệnh của chúng tôi: <br />
                    <b>- Tôn thờ Thiên Chúa</b> <br />
                    <b>- Yêu thương đồng bào</b> <br />
                    <b>- Phục vụ tha nhân.</b> <br />
                </p> <br />
                
                <p>Trong tinh thần đó, trang mạng này được xây dựng nhằm:</p> <br />
                <p>- Giới thiệu đến cộng đồng người Việt tại Hoa Kỳ nói chung và cộng đồng Jacksonville nói riêng biết đến sự có mặt của chúng tôi - Hội Thánh Baptist của người Việt</p> <br />
                - Kết nối qui con cái Chúa từ xa chuyển đến vùng Jacksonville <br />
                <p>- Kết nối với qui đồng hương với mong muốn giữ mối liên hệ trong văn hoá người Việt. Ngoài ra, chúng tôi có một số mục vụ có thể hỗ trợ và kết nối cộng đồng người Việt trong vùng.</p> <br />
                <p>Hội Thánh luôn ao ước mọi người truy cập vào mạng lưới đều có thể tìm thấy điều mình đang nhu cần và cùng đến với Hội Thánh để cùng năng đỡ, khích lệ trong niềm tin, cũng như trong nền văn hoá dân tộc Việt Nam.</p> <br />

                <p>Chúng tôi cũng hoan nghênh và cảm ơn quý vị đã truy cập vào mạng lưới. Bên cạnh đó cũng rất mong quý vị để lòng quan tâm, giới thiệu cho người khác biết đến mạng lưới truyền thông nầy và cùng nhau khám phá những điều ích lợi đang được truyền tải.</p> <br />

                <p>Quí vị có thể truy cập qua các địa chỉ sau: </p> <br />

                <div className="introduce-footer">
                    <p><b>Aspire Vietnamese Baptist Church</b> <br />
                        Địa chỉ: <b>{homeSite.address}</b> <br />
                        Điện thoại: <b>{homeSite.phone}</b>
                    </p>
                    <div></div>
                    <p>
                        Website: <b>{homeSite.website}</b> <br />
                        Email: <b>{homeSite.email}</b><br />
                        Fanpage: <b>{homeSite.fanpage}</b><br />
                    </p>
                </div>
            </div>
        </div>
    </section> );
}

export default Introduce;