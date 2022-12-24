import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade } from "swiper";

import styled from "styled-components";

import slider1 from "../../images/slider1.png";
import slider2 from "../../images/slider2.png";
import slider3 from "../../images/slider3.png";
import slider4 from "../../images/slider4.png";

const SliderContainer = () => {
  const items = [
    {
      src: slider1,
    },
    {
      src: slider2,
    },
    {
      src: slider3,
    },
    {
      src: slider4,
    },
  ];
  return (
    <>
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        className="mySwiper"
        loop={true}
        style={{
          height: "583px",
          backgroundPosition: "-46px 0",
          flexBasis: "380.32px",
          marginLeft: "380px",
          backgroundImage:
            "url(https://static.cdninstagram.com/rsrc.php/v3/y4/r/ItTndlZM2n2.png)",
        }}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Image src={item.src} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

const Image = styled.img`
  width: 250px;
  height: 538.84px;
  margin-top: 27px;
  margin-left: 110px;
`;

export default SliderContainer;
