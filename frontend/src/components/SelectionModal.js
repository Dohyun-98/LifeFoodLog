import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../config/config";
import { getCookie } from "../utils/cookie/cookie";
import "./css/selection-modal.css";

export const SelectionModal = (props) => {
  // 세로로 메인카테고리, 서브 카테고리, 이름이 보여지는 모달창
  // props로 받아온 데이터를 가지고 렌더링
  const [maincategoryData, setMaincategoryData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [selectFood, setSelectFood] = useState([]);

  const [clickedMainCategory, setClickedMainCategory] = useState("");
  const [clickedSubCategory, setClickedSubCategory] = useState("");

  useEffect(() => {
    async function getMainCategory() {
      const res = await axios.get(API.GETMAINCATEGORY);
      setMaincategoryData(res.data);

      const config = {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      };
      const selectedFoodData = await axios.get(
        API.GETSELECTEDFOOD + "/" + props.time,
        config
      );
      const selectedFood = selectedFoodData.data.map((food) => {
        return {
          id: food.food.id,
          name: food.food.name + "(" + food.food.kcal + ")",
        };
      });
      setSelectFood(selectedFood);
    }
    getMainCategory();
  }, []);

  const getSubCategory = async (id, e) => {
    setClickedMainCategory(Number(e.target.id));
    setClickedSubCategory("");
    setSubcategoryData([]);
    setFoodData([]);

    const res = await axios.get(API.GETSUBCATEGORY + "/" + id).catch((err) => {
      alert("잠시 후 다시 시도해주세요.");
    });
    setSubcategoryData(res.data);
  };

  const getFood = async (id, e) => {
    setClickedSubCategory(Number(e.target.id));
    const res = await axios.get(API.GETFOODS + "/" + id).catch((err) => {
      alert("잠시 후 다시 시도해주세요.");
    });
    setFoodData(res.data);
  };

  const addFood = (id, name) => {
    const isExist = selectFood.find((food) => food.id === id);
    if (isExist) {
      return;
    }
    const food = {
      id: id,
      name: name,
    };
    setSelectFood([...selectFood, food]);
  };

  const removeFood = (id) => {
    const newFood = selectFood.filter((food) => food.id !== id);
    setSelectFood(newFood);
  };

  const selected = async () => {
    // axios header 설정
    const accessToken = getCookie("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const foodId = selectFood.map((food) => food.id);
    await axios
      .post(
        API.CREATEFOODLOG + "/" + props.time,
        {
          foods: foodId,
        },
        config
      )
      .catch((err) => {
        alert("잠시 후 다시 시도해주세요.");
      });
    props.asyncgetKcalData();
    props.setModalVisible(false);
  };
  return (
    <div>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">선택창</span>
          <span
            className="modal-close"
            onClick={() => {
              props.setModalVisible(false);
            }}
          >
            X
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-select-group">
            <div className="modal-select-box main-category">
              <div className="select-box-title ">
                <span>종류</span>
              </div>
              <div className="modal-select-box">
                {maincategoryData.map((data, idx) => {
                  return (
                    <span
                      id={idx}
                      key={data.id}
                      className={
                        "select-" +
                        (clickedMainCategory === idx ? "clicked" : "unclicked")
                      }
                      onClick={(e) => getSubCategory(data.id, e)}
                    >
                      {data.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="modal-select-box sub-category">
              <div className="select-box-title">
                <span>세부 종류</span>
              </div>
              <div className="modal-select-box">
                {subcategoryData.map((data, idx) => {
                  return (
                    <span
                      id={idx}
                      key={data.id}
                      onClick={(e) => getFood(data.id, e)}
                      className={
                        "select-" +
                        (clickedSubCategory === idx ? "clicked" : "unclicked")
                      }
                    >
                      {data.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="modal-select-box name">
              <div className="select-box-title">
                <span>이름(kcal)</span>
              </div>
              <div className="modal-select-box">
                {foodData.map((data, idx) => {
                  return (
                    <span
                      key={data.id + idx}
                      onClick={() =>
                        addFood(data.id, data.name + "(" + data.kcal + ")")
                      }
                    >
                      {data.name + "(" + data.kcal + ")"}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="modal-selected-group">
            <div className="modal-selected-box">
              <div className="select-box-title">
                <span>선택된 음식</span>
              </div>
              {selectFood.map((data, idx) => {
                return (
                  <span key={idx} onClick={() => removeFood(data.id)}>
                    {data.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="modal-button-group">
            <button className="modal-footer-btn" onClick={selected}>
              선택
            </button>
            <button
              className="modal-footer-btn"
              onClick={() => props.setModalVisible(false)}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
