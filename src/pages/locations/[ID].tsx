import React, { useEffect, useState } from "react";
import { useRouter } from "next/router" 
import { useParams } from "next/navigation";

import {BASE_URL} from "@/constants/HomeC"
import { Location } from "@/interfaces/HomeT";



export default function CharcterByID() {
  const [loading, setLoading] = useState<boolean>(false);
  const location_ID = useParams<{ID: string}>();
  console.log(location_ID.ID);

  useEffect(() => {
    setLoading(true)
  }, [])

  return (
    <>
      <h1></h1>
    </>
  );
}
