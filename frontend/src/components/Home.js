import React, { useEffect, useState } from "react";
import "./css/home.css";
import {
  XYPlot,
  VerticalBarSeries,
  XAxis,
  YAxis,
  RadialChart,
  DiscreteColorLegend,
} from "react-vis";
import { SelectDashBoard } from "./SelectDashBoard";
import { SelectionModal } from "./SelectionModal";
import axios from "axios";
import { API } from "../config/config";
import { getCookie } from "../utils/cookie/cookie";
import { isExpiration } from "../utils/cookie/is-expiration";

export const Home = () => {
  const [breakfast_kcal, setBreakfastKcal] = useState(0);
  const [lunchKcal_kcal, setLunchKcal] = useState(0);
  const [dinnerKcal_kcal, setDinnerKcal] = useState(0);
  const [totalKcal, setTotalKcal] = useState(0);

  const [time, setTime] = useState("");
  const [periodBreakfast, setPeriodBreakfast] = useState([]);
  const [periodLunch, setPeriodLunch] = useState([]);
  const [periodDinner, setPeriodDinner] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [circleData, setCircleData] = useState([]);
  const [barPeriod, setBarPeriod] = useState(7);
  const [ciclePeriod, setCiclePeriod] = useState(7);

  async function asyncgetKcalData() {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const result = await axios.get(API.GETKCAL, config).catch((err) => {
      console.log(err);
      isExpiration(err.response.data.statusCode);
    });

    if (result) {
      setBreakfastKcal(result.data.breakfastKcal);
      setLunchKcal(result.data.lunchKcal);
      setDinnerKcal(result.data.dinnerKcal);
      setTotalKcal(result.data.totalKcal);
    }
  }

  const getBarGraphData = async (period) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .get(API.GETGRAPHDATA + "/day/" + period, config)
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
      });
    const breakdfast = Array.from({ length: period }, (v, i) => {
      const date = new Date(
        Date.now() - (period - i - 1) * 24 * 60 * 60 * 1000
      );
      const xDate = `${date.getMonth() + 1}/${String(date.getDate()).padStart(
        2,
        "0"
      )}`;
      const yData = data.data.filter((el) => {
        const elDate =
          el.createdAt.split("-")[1] +
          "/" +
          el.createdAt.split("-")[2].split("T")[0];
        return elDate === xDate;
      });
      return {
        x: xDate,
        y: yData[0] ? yData[0].breakfastKcal : 0,
      };
    });
    setPeriodBreakfast(breakdfast);

    const lunch = Array.from({ length: period }, (v, i) => {
      const date = new Date(
        Date.now() - (period - i - 1) * 24 * 60 * 60 * 1000
      );
      const xDate = `${date.getMonth() + 1}/${String(date.getDate()).padStart(
        2,
        "0"
      )}`;
      const yData = data.data.filter((el) => {
        const elDate =
          el.createdAt.split("-")[1] +
          "/" +
          el.createdAt.split("-")[2].split("T")[0];
        return elDate === xDate;
      });
      return {
        x: xDate,
        y: yData[0] ? yData[0].lunchKcal : 0,
      };
    });
    setPeriodLunch(lunch);

    const dinner = Array.from({ length: period }, (v, i) => {
      const date = new Date(
        Date.now() - (period - i - 1) * 24 * 60 * 60 * 1000
      );
      const xDate = `${date.getMonth() + 1}/${String(date.getDate()).padStart(
        2,
        "0"
      )}`;
      const yData = data.data.filter((el) => {
        const elDate =
          el.createdAt.split("-")[1] +
          "/" +
          el.createdAt.split("-")[2].split("T")[0];
        return elDate === xDate;
      });
      return {
        x: xDate,
        y: yData[0] ? yData[0].dinnerKcal : 0,
      };
    });
    setPeriodDinner(dinner);
  };

  useEffect(() => {
    asyncgetKcalData();
    // 첫 렌더링시, 그래프 데이터 7일치 불러오기
    getBarGraphData(7);
    getCircleDate(7);
  }, []);

  const getGraph = (value) => {
    if (value === "7") {
      getBarGraphData(value);
    }
    if (value === "4") {
      getWeekGraph(value);
    }
    if (value === "3" || value === "6" || value === "12") {
      getMonthGraph(value);
    }
  };

  const getWeekGraph = async (period) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .get(API.GETGRAPHDATA + "/week/" + period, config)
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
      });
    const breakfast = data.data.map((el, i) => {
      return {
        x: i + 1 + "주차",
        y: el.breakfastKcal ? parseInt(el.breakfastKcal) : 0,
      };
    });
    setPeriodBreakfast(breakfast);

    const lunch = data.data.map((el, i) => {
      return {
        x: i + 1 + "주차",
        y: el.lunchKcal ? parseInt(el.lunchKcal) : 0,
      };
    });
    setPeriodLunch(lunch);

    const dinner = data.data.map((el, i) => {
      return {
        x: i + 1 + "주차",
        y: el.dinnerKcal ? parseInt(el.dinnerKcal) : 0,
      };
    });
    setPeriodDinner(dinner);
  };

  const getMonthGraph = async (period) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .get(API.GETGRAPHDATA + "/month/" + period, config)
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
      });
    const thisMonth = new Date().getMonth() + 1;
    const breakfast = data.data.map((el, i) => {
      return {
        x:
          thisMonth - period + 1 < 0
            ? thisMonth - period + 1 + i + 12 + "월"
            : thisMonth - period + 1 + i + "월",
        y: el.breakfastKcal ? parseInt(el.breakfastKcal) : 0,
      };
    });
    setPeriodBreakfast(breakfast);
    const lunch = data.data.map((el, i) => {
      return {
        x:
          thisMonth - period + 1 < 0
            ? thisMonth - period + 1 + i + 12 + "월"
            : thisMonth - period + 1 + i + "월",
        y: el.lunchKcal ? parseInt(el.lunchKcal) : 0,
      };
    });
    setPeriodLunch(lunch);
    const dinner = data.data.map((el, i) => {
      return {
        x:
          thisMonth - period + 1 < 0
            ? thisMonth - period + 1 + i + 12 + "월"
            : thisMonth - period + 1 + i + "월",
        y: el.dinnerKcal ? parseInt(el.dinnerKcal) : 0,
      };
    });
    setPeriodDinner(dinner);
  };

  const getCircleDate = async (value) => {
    const period = value;
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const params = {
      period: period,
    };

    const data = await axios
      .get(API.GETCIRCLEDATA + "/" + period, config, params)
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
      });
    setCircleData(data.data);
  };

  const visibleModal = (time) => {
    setModalVisible(true);
    setTime(time);
  };
  return (
    <div className="home">
      {modalVisible ? (
        // 세로 중복선택 카테고리
        <SelectionModal
          time={time}
          setModalVisible={setModalVisible}
          asyncgetKcalData={asyncgetKcalData}
          getBarGraphData={getBarGraphData}
          getCircleDate={getCircleDate}
          barPeriod={barPeriod}
          ciclePeriod={ciclePeriod}
        />
      ) : null}
      <div className="wrapper-title">
        <span>Today</span>
      </div>
      <div className="wrapper-dashboard-box">
        <button
          className="select-button"
          onClick={() => visibleModal("breakfast")}
        >
          <SelectDashBoard kcal={breakfast_kcal} title={"breakfast"} />
        </button>
        <button className="select-button" onClick={() => visibleModal("lunch")}>
          <SelectDashBoard kcal={lunchKcal_kcal} title={"lunch"} />
        </button>
        <button
          className="select-button"
          onClick={() => visibleModal("dinner")}
        >
          <SelectDashBoard kcal={dinnerKcal_kcal} title={"dinner"} />
        </button>
      </div>
      <div className="total-kcal-box">
        <span>오늘 하루 총열량: {totalKcal} kcal</span>
      </div>
      <div className="wrapper-title wrapper-down-title ">
        <span>기간별 열량 그래프</span>
        <select
          className="select-chart"
          onChange={(e) => {
            setBarPeriod(e.target.value);
            getGraph(e.target.value);
          }}
        >
          <option value="7">최근 일주일</option>
          <option value="4">최근 4주</option>
          <option value="3">최근 3개월</option>
          <option value="6">최근 6개월</option>
          <option value="12">최근 1년</option>
        </select>
      </div>
      <div className="chart-box">
        <div className="lengend-box">
          <DiscreteColorLegend
            items={[
              { title: "아침", color: "#12939A", strokeWidth: 4 },
              { title: "점심", color: "#79C7E3", strokeWidth: 4 },
              { title: "저녁", color: "#1A3177", strokeWidth: 4 },
            ]}
            style={{ fontSize: 13, color: "gray" }}
            orientation="horizontal"
          ></DiscreteColorLegend>
        </div>
        <XYPlot
          stackBy="y"
          width={800}
          height={300}
          margin={80}
          xType="ordinal"
        >
          <XAxis
            attr="x"
            attrAxis="y"
            orientation="bottom"
            style={{ fontSize: 13, color: "gray" }}
          />
          <YAxis
            attr="y"
            attrAxis="x"
            orientation="left"
            style={{ fontSize: 13, color: "gray" }}
          />
          <VerticalBarSeries
            cluster="stack 1"
            data={periodBreakfast}
            style={{ fontSize: 13, color: "gray" }}
          />
          <VerticalBarSeries
            cluster="stack 1"
            data={periodLunch}
            style={{ fontSize: 13, color: "gray" }}
          />
          <VerticalBarSeries
            cluster="stack 1"
            data={periodDinner}
            style={{ fontSize: 13, color: "gray" }}
          />
        </XYPlot>
      </div>
      <div className="wrapper-title wrapper-down-title ">
        <span>기간별 섭취 음식 분류</span>
        <select
          className="select-chart"
          onChange={(e) => {
            setCiclePeriod(e.target.value);
            getCircleDate(e.target.value);
          }}
        >
          <option value="7">1주일</option>
          <option value="30">1개월</option>
          <option value="90">3개월</option>
          <option value="180">6개월</option>
          <option value="365">1년</option>
        </select>
      </div>
      <div className="chart-box">
        <RadialChart
          width={800}
          height={300}
          data={circleData}
          labelsRadiusMultiplier={0.8}
          labelsStyle={{
            fontSize: 12,
          }}
          style={{
            stroke: "#fff",
            strokeWidth: 5,
          }}
          showLabels
        />
      </div>
    </div>
  );
};
