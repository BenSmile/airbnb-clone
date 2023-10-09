'use client';

import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This is property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This is property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This is property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This is property is in the countryside!",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This is property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This is property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This is property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This is property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has a camping activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has a camping activities",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
];
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            selected={category === item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
