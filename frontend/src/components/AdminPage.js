import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../config/config";
import { getCookie } from "../utils/cookie/cookie";
import "./css/admin-page.css";
export const AdminPage = () => {
  // maincategory data
  const [mainCategoryData, setMainCategoryData] = useState([]);
  const [mainCategoryName, setMainCategoryName] = useState("");
  // ========================

  const [subCategoryData, setSubCategoryData] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  // food data
  const [subCategoryData2, setSubCategoryData2] = useState([]);
  const [subCategoryData3, setSubCategoryData3] = useState([]);
  const [mainCategoryData2, setMainCategoryData2] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodKcal, setFoodKcal] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    getMainCategory();
    // getSubCategory();
    // getFood();
  }, []);

  const getMainCategory = async () => {
    const data = await axios.get(API.GETMAINCATEGORY);
    setMainCategoryData(data.data);
    setMainCategoryData2(data.data);
  };

  const getSubCategory = async (id) => {
    const data = await axios.get(API.GETSUBCATEGORY + "/" + id);
    setSubCategoryData(data.data);
  };

  const getSubCategory2 = async (id) => {
    const data = await axios.get(API.GETSUBCATEGORY + "/" + id);
    setSubCategoryData2(data.data);
  };

  const getSubCategory3 = async (id) => {
    const data = await axios.get(API.GETSUBCATEGORY + "/" + id);
    setSubCategoryData3(data.data);
  };

  const getFood = async (id) => {
    const data = await axios.get(API.GETFOODS + "/" + id);
    setFoodData(data.data);
  };

  const createMainCategory = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios
      .post(
        API.GETMAINCATEGORY,
        {
          name: mainCategoryName,
        },
        config
      )
      .catch((err) => {
        console.log(err);
        return;
      });

    setMainCategoryName("");
    getMainCategory();
  };

  const deleteMainCategory = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios.delete(API.GETMAINCATEGORY + "/" + id, config).catch((err) => {
      console.log(err);
      return;
    });
    getMainCategory();
  };

  const createSubCategory = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios
      .post(
        API.GETSUBCATEGORY,
        {
          name: subCategoryName,
          maincategory: selectedMainCategory,
        },
        config
      )
      .catch((err) => {
        console.log(err);
        return;
      });

    setSubCategoryName("");
  };

  const deleteSubCategory = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios.delete(API.GETSUBCATEGORY + "/" + id, config).catch((err) => {
      console.log(err);
      return;
    });

    getSubCategory(selectedMainCategory);
  };

  const createFood = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    console.log(foodName, foodKcal, selectedSubCategory);
    await axios
      .post(
        API.GETFOODS,
        {
          name: foodName,
          kcal: parseInt(foodKcal),
          subcategory: selectedSubCategory,
        },
        config
      )
      .catch((err) => {
        console.log(err);
        return;
      });

    setFoodName("");
    setFoodKcal("");
  };

  const deleteFood = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios.delete(API.GETFOODS + "/" + id, config).catch((err) => {
      console.log(err);
      return;
    });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h3>메인 카테고리 조회 및 삭제</h3>
      <div className="main-category-search">
        {mainCategoryData.map((data) => {
          return (
            <span key={data.id}>
              {data.name}
              <button onClick={() => deleteMainCategory(data.id)}>삭제</button>
            </span>
          );
        })}
      </div>
      <h3>메인 카테고리 추가</h3>
      <div className="main-category-create">
        <input
          type="text"
          placeholder="메인 카테고리 이름"
          value={mainCategoryName}
          onChange={(e) => setMainCategoryName(e.target.value)}
        />
        <button onClick={createMainCategory}>생성</button>
      </div>

      <h3>서브 카테고리 조회 및 삭제</h3>
      <select
        id="main-category"
        onChange={(e) => getSubCategory(e.target.value)}
      >
        <option defaultValue={""}>메인 카테고리 선택</option>
        {mainCategoryData.map((data) => {
          return (
            <option value={data.id} key={data.id}>
              {data.name}
            </option>
          );
        })}
      </select>
      <div className="main-category-search">
        {subCategoryData.map((data) => {
          return (
            <span key={data.id}>
              {data.name}{" "}
              <button
                onClick={() => {
                  deleteSubCategory(data.id);
                }}
              >
                삭제
              </button>
            </span>
          );
        })}
      </div>
      <h3>서브 카테고리 추가</h3>
      <div className="main-category-create">
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setSelectedMainCategory(e.target.value);
          }}
        >
          <option defaultValue={""}>메인 카테고리 선택</option>

          {mainCategoryData.map((data) => {
            return (
              <option value={data.id} key={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          placeholder="서브 카테고리 이름"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />
        <button onClick={createSubCategory}>생성</button>
      </div>
      <h3> Food 조회 및 삭제 </h3>
      <select onChange={(e) => getSubCategory2(e.target.value)}>
        <option defaultValue={""}>메인 카테고리 선택</option>
        {mainCategoryData.map((data) => {
          return (
            <option value={data.id} key={data.id}>
              {data.name}
            </option>
          );
        })}
      </select>
      <select id="main-category" onChange={(e) => getFood(e.target.value)}>
        <option defaultValue={""}>서브 카테고리 선택</option>
        {subCategoryData2.map((data) => {
          return (
            <option value={data.id} key={data.id}>
              {data.name}
            </option>
          );
        })}
      </select>
      <div className="main-category-search">
        {foodData.map((data) => {
          return (
            <span key={data.id}>
              {data.name}{" "}
              <button onClick={() => deleteFood(data.id)}>삭제</button>
            </span>
          );
        })}
      </div>
      <h3> Food 추가 </h3>
      <div className="main-category-create">
        <select
          name="main-category"
          onChange={(e) => getSubCategory3(e.target.value)}
        >
          <option defaultValue={""}>메인 카테고리 선택</option>
          {mainCategoryData2.map((data) => {
            return (
              <option value={data.id} key={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>
        <select
          id="sub-category"
          onChange={(e) => {
            setSelectedSubCategory(e.target.value);
          }}
        >
          <option defaultValue={""}>서브 카테고리 선택</option>
          {subCategoryData3.map((data) => {
            return (
              <option value={data.id} key={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          placeholder="food 카테고리 이름"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="text"
          placeholder="food kcal"
          value={foodKcal}
          onChange={(e) => setFoodKcal(e.target.value)}
        />
        <button onClick={createFood}>생성</button>
      </div>
    </div>
  );
};
