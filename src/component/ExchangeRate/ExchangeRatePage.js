import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";

import CountryList from "./CountryList";
import "./ExchangeRate.css";
import { Button, Input, Select, Table, Tag, DatePicker } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SwapOutlined,
} from "@ant-design/icons";

const { Option } = Select;

function ExchangeRatePage() {
  const [exchangeRate, setExchangeRate] = useState();
  const [exchangeRateList, setExchangeRateList] = useState([]);
  const [country, setCountry] = useState(CountryList[1]);
  const [rateEdit, setRateEdit] = useState(false);
  const [foreignCurrency, setForeignCurrency] = useState(0);
  const [krw, setKrw] = useState(0);
  const [today, setToday] = useState(moment());
  const columns = [
    {
      title: "",
      dataIndex: "emoji",
      width: "40px",
    },
    {
      title: "국가",
      key: "countryName",
      dataIndex: "countryName",
    },
    {
      title: "통화명",
      key: "curruncyName",
      dataIndex: "curruncyName",
    },
    {
      title: "통화코드",
      dataIndex: "cur_unit",
    },
    {
      title: "매매 기준율",
      dataIndex: "deal_bas_r",
    },
    {
      title: "전일대비",
      key: "netChange",
      dataIndex: "netChange",
      render: (netChange, curruncyName) => (
        <div>
          {netChange < 0 ? (
            <Tag color="blue" key={curruncyName}>
              <CaretDownOutlined /> {netChange}
            </Tag>
          ) : (
            <Tag color="red" key={curruncyName}>
              <CaretUpOutlined /> {netChange}
            </Tag>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    let inputDate = moment(today);
    let dayToday = inputDate.day(); //일 0, 월 1, 토 6
    let ddate = inputDate;
    let d1date = inputDate;
    if (dayToday === 6) {
      //ddate = new Date(today.getTime());
      // ddate = new Date(ddate.setDate(ddate.getDate() - 1));
      ddate = inputDate.clone().subtract(1, "days");
      d1date = inputDate.clone().subtract(2, "days");
    } else if (dayToday === 0) {
      ddate = inputDate.clone().subtract(2, "days");
      d1date = inputDate.clone().subtract(3, "days");
    } else if (dayToday === 1) {
      ddate = inputDate;
      d1date = inputDate.clone().subtract(3, "days");
    } else {
      ddate = inputDate;
      d1date = inputDate.clone().subtract(1, "days");
    }

    let ddateStr = ddate.format("YYYYMMDD");
    let d1dateStr = d1date.format("YYYYMMDD");
    /* ddate.getFullYear().toString() +
      (ddate.getMonth() + 1).toString() +
      ddate.getDate().toString();*/
    let neweExchangeList = [];
    Axios.get(
      "https://rhv2mfccrf.execute-api.ap-northeast-2.amazonaws.com/prod/exchange/" +
        ddateStr
    ).then((exchangeList) => {
      Axios.get(
        "https://rhv2mfccrf.execute-api.ap-northeast-2.amazonaws.com/prod/exchange/" +
          d1dateStr
      ).then((preExchangeList) => {
        //netChange 계산
        for (let i = 0; i < exchangeList.data.length; i++) {
          if (
            preExchangeList.data[i].cur_unit === exchangeList.data[i].cur_unit
          ) {
            let netChange = (
              exchangeList.data[i].deal_bas_r.replace(/,/g, "") -
              preExchangeList.data[i].deal_bas_r.replace(/,/g, "")
            ).toFixed(2);
            Object.assign(exchangeList.data[i], { netChange: netChange });
          } else {
            alert("netChange error");
          }
        }
        //Country join
        let key = -1;
        for (let country of CountryList) {
          let exchangeObj = exchangeList.data.filter(
            (row) => row.cur_unit === country.cur_unit
          );
          if (exchangeObj.length !== 0) {
            key = key + 1;
            let cur_nm = exchangeObj[0].cur_nm.split(" ");
            if (cur_nm[0] === "위안화") {
              cur_nm[0] = "중국";
              cur_nm[1] = "위안";
            }
            if (cur_nm[0] === "유로") {
              cur_nm[0] = "유럽연합";
              cur_nm[1] = "유로";
            }
            let exchangeRate = {
              key: key,
              countryName: cur_nm[0],
              curruncyName: cur_nm[1],
            };
            Object.assign(exchangeRate, country, exchangeObj[0]);
            neweExchangeList.push(exchangeRate);
            exchangeList.data.splice(
              exchangeList.data.indexOf(exchangeObj[0]),
              1
            );
          }
        }
        //Others
        for (let data of exchangeList.data) {
          key = key + 1;
          let cur_nm = data.cur_nm.split(" ");
          let exchangeRate = {
            key: key,
            countryName: cur_nm[0],
            curruncyName: cur_nm[1],
          };
          Object.assign(exchangeRate, data);
          neweExchangeList.push(exchangeRate);
        }
        setExchangeRateList(neweExchangeList);
      });
    });
  }, [today]);

  const onSelectCurruncy = (value) => {
    //antd 문법
    let counrty = exchangeRateList[value];
    setCountry(counrty);
    setExchangeRate(counrty.deal_bas_r.replace(/,/g, ""));
  };

  const onChangeExchangeRate = (e) => {
    setExchangeRate(e.target.value);
  };

  const onChangeRateEdit = (e) => {
    setRateEdit((current) => !current);
  };

  const onChangeForeignCurrency = (e) => {
    setForeignCurrency(e.target.value);
    setKrw(e.target.value * exchangeRate);
  };
  const onChangeKRW = (e) => {
    setKrw(e.target.value);
    setForeignCurrency(e.target.value / exchangeRate);
  };
  const onChangeToday = (date) => {
    if (moment().isBefore(date) || date === null) {
      alert("오늘 날짜보다 이전 날짜만 조회할 수 있습니다.");
      setToday(moment());
      return;
    }
    setToday(date);
  };
  return (
    <div className="exchange-container">
      <div className="exchange-form">
        <div className="datepicker">
          <DatePicker
            size="large"
            bordered={false}
            value={today}
            onChange={onChangeToday}
          />
        </div>
        <div className="exchange-edit">
          <Select
            className="exchange-select"
            value={country.countryName}
            onChange={onSelectCurruncy}
          >
            {exchangeRateList.map((country, index) => (
              <Option key={country.countryName} value={index}>
                {country.countryName}
              </Option>
            ))}
          </Select>
          <Input
            className="exchange-input"
            allowClear
            id="exchangeRate"
            value={exchangeRate}
            type="number"
            onChange={onChangeExchangeRate}
            disabled={!rateEdit}
          />
          <Button
            className="exchange-button"
            onClick={onChangeRateEdit}
            type={rateEdit ? "" : "primary"}
          >
            {rateEdit ? "취소" : "편집"}
          </Button>
        </div>
        <div className="result-edit">
          <label htmlFor="currency">
            {country.cur_unit.length > 3
              ? country.cur_unit.substring(0, 3)
              : country.cur_unit}
          </label>
          <Input
            allowClear
            id="currency"
            value={foreignCurrency}
            type="number"
            onChange={onChangeForeignCurrency}
            prefix={country.curruncySign}
            suffix={country.curruncyName}
          />
        </div>
        <SwapOutlined className="swap-icon" />
        <div className="result-edit">
          <label htmlFor="krw">KRW</label>
          <Input
            allowClear
            id="krw"
            value={krw}
            type="number"
            onChange={onChangeKRW}
            prefix="￦"
            suffix="원"
          />
        </div>
        <Table
          className="exchange-table"
          columns={columns}
          dataSource={exchangeRateList}
          size="middle"
          scroll={{ y: "500px" }}
          pagination={{ defaultPageSize: 50, position: ["none", "none"] }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                let exchange = record.deal_bas_r.replace(/,/g, "");
                setExchangeRate(exchange);
                setCountry(record);
              },
            };
          }}
        />
      </div>
    </div>
  );
}

export default ExchangeRatePage;
