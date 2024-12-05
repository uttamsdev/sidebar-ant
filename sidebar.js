"use client";
import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

// Define your menu items
const items = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "Navigation One",
    children: [
      { key: "11", label: "Option 1" },
      { key: "12", label: "Option 2" },
      { key: "13", label: "Option 3" },
      { key: "14", label: "Option 4" },
    ],
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "Navigation Two",
    children: [
      { key: "21", label: "Option 1" },
      { key: "22", label: "Option 2" },
      {
        key: "23",
        label: "Submenu",
        children: [
          { key: "231", label: "Option 1" },
          { key: "232", label: "Option 2" },
          { key: "233", label: "Option 3" },
        ],
      },
      {
        key: "24",
        label: "Submenu 2",
        children: [
          { key: "241", label: "Option 1" },
          { key: "242", label: "Option 2" },
          { key: "243", label: "Option 3" },
        ],
      },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Navigation Three",
    children: [
      { key: "31", label: "Option 1" },
      { key: "32", label: "Option 2" },
      { key: "33", label: "Option 3" },
      { key: "34", label: "Option 4" },
    ],
  },
  {
    key: "grp",
    label: "Group",
    type: "group",
    children: [
      { key: "13x", label: "Option 13" },
      { key: "1x4", label: "Option 14" },
      {
        key: "2x3",
        label: "Submenu",
        children: [
          { key: "x0", label: "Option 1" },
          { key: "1x", label: "Option 2" },
          { key: "2x33", label: "Option 3" },
        ],
      },
    ],
  },
];

// Get level keys function
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items);

const App = () => {
  // State to track open keys and selected key
  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    // Retrieve saved state from localStorage on component mount
    const savedOpenKeys = JSON.parse(localStorage.getItem("openKeys"));
    const savedSelectedKey = localStorage.getItem("selectedKey");

    if (savedOpenKeys) {
      setStateOpenKeys(savedOpenKeys);
    }
    if (savedSelectedKey) {
      setSelectedKey(savedSelectedKey);
    }
  }, []);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }

    // Save openKeys to localStorage
    localStorage.setItem("openKeys", JSON.stringify(openKeys));
  };

  const onSelect = ({ key }) => {
    setSelectedKey(key);

    // Save selected key to localStorage
    localStorage.setItem("selectedKey", key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]} // Use selectedKey from state
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default App;
