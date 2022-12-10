import React, { useEffect, useState } from "react";
import "./css/home.css";
import {
  XYPlot,
  VerticalBarSeries,
  XAxis,
  YAxis,
  RadialChart,
} from "react-vis";
import { SelectDashBoard } from "./SelectDashBoard";
import { SelectionModal } from "./SelectionModal";

export const Home = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [Yvalue, setYvalue] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const max = Math.max(...breakfast, ...lunch, ...dinner);
    setYvalue(max);
  }, [breakfast, lunch, dinner]);
  // 음식을 선택하는 모달창을 띄울 때 음식에 대한 데이터(id, category name kcal)
  const foodData = [
    {
      id: 1,
      maincategory: "식사",
      subcategory: "한식",
      name: "고등어 구이",
      kcal: 100,
    },
    {
      id: 2,
      maincategory: "디저트",
      subcategory: "커피",
      name: "아메리카노",
      kcal: 400,
    },
    {
      id: 3,
      maincategory: "간식",
      subcategory: "과자",
      name: "달걀과자",
      kcal: 300,
    },
    {
      id: 3,
      maincategory: "과일&채소",
      subcategory: "과일",
      name: "사과",
      kcal: 300,
    },
  ];

  const visibleModal = (time) => {
    console.log(time);

    setModalVisible(true);
  };
  return (
    <div className="home">
      {modalVisible ? (
        // 세로 중복선택 카테고리
        <SelectionModal setModalVisible={setModalVisible} />
      ) : null}
      <div className="wrapper-title">
        <span>Today</span>
      </div>
      <div className="wrapper-dashboard-box">
        <button
          className="select-button"
          onClick={() => visibleModal("breakfast")}
        >
          <SelectDashBoard title={"아침"} />
        </button>
        <button className="select-button">
          <SelectDashBoard title={"점심"} />
        </button>
        <button className="select-button">
          <SelectDashBoard title={"저녁"} />
        </button>
      </div>
      <div className="wrapper-title wrapper-down-title ">
        <span>하루 열량 그래프</span>
        <select className="select-chart">
          <option value="1">1주일</option>
          <option value="2">1개월</option>
          <option value="3">3개월</option>
          <option value="4">6개월</option>
          <option value="5">1년</option>
        </select>
      </div>
      <div className="chart-box">
        <XYPlot stackBy="y" width={800} height={300} margin={80}>
          <XAxis attr="x" attrAxis="y" orientation="bottom" />
          <YAxis attr="y" attrAxis="x" orientation="left" />
          <VerticalBarSeries
            cluster="stack 1"
            data={[
              {
                x: 0,
                y: 10,
              },
              {
                x: 1,
                y: 12.099068232058233,
              },
              {
                x: 2,
                y: 10.28409934982493,
              },
              {
                x: 3,
                y: 10.063587366308928,
              },
              {
                x: 4,
                y: 11.312039304865309,
              },
              {
                x: 5,
                y: 12.575815414890405,
              },
              {
                x: 6,
                y: 13.510081950032323,
              },
              {
                x: 7,
                y: 12.263703471823607,
              },
              {
                x: 8,
                y: 14.24804597708568,
              },
            ]}
            style={{}}
          />
          <VerticalBarSeries
            cluster="stack 1"
            data={[
              {
                x: 0,
                y: 10,
              },
              {
                x: 1,
                y: 11.240809202615784,
              },
              {
                x: 2,
                y: 12.346571760060211,
              },
              {
                x: 3,
                y: 10.41138289252149,
              },
              {
                x: 4,
                y: 8.892377946693177,
              },
              {
                x: 5,
                y: 10.869087355198035,
              },
              {
                x: 6,
                y: 11.540378520357805,
              },
              {
                x: 7,
                y: 10.200992777754793,
              },
              {
                x: 8,
                y: 11.342113834465554,
              },
            ]}
            style={{}}
          />
          <VerticalBarSeries
            cluster="stack 1"
            data={[
              {
                x: 0,
                y: 10,
              },
              {
                x: 1,
                y: 11.779725595589941,
              },
              {
                x: 2,
                y: 13.597879973352274,
              },
              {
                x: 3,
                y: 13.82763848217541,
              },
              {
                x: 4,
                y: 16.03155088309835,
              },
              {
                x: 5,
                y: 13.368854010428684,
              },
              {
                x: 6,
                y: 11.054583626427618,
              },
              {
                x: 7,
                y: 8.968493864768567,
              },
              {
                x: 8,
                y: 7.838454418774782,
              },
            ]}
            style={{}}
          />
        </XYPlot>
      </div>
      <div className="wrapper-title wrapper-down-title ">
        <span>기간별 섭취 음식 분류</span>
        <select className="select-chart">
          <option value="1">1주일</option>
          <option value="2">1개월</option>
          <option value="3">3개월</option>
          <option value="4">6개월</option>
          <option value="5">1년</option>
        </select>
      </div>
      <div className="chart-box">
        <RadialChart
          width={800}
          height={300}
          data={[
            {
              angle: 14,
              label: "deck.gl",
            },
            {
              angle: 23,
              label: "math.gl",
            },
            {
              angle: 32,
              label: "probe.gl",
            },
            {
              angle: 18,
              label: "vis.gl",
            },
          ]}
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
