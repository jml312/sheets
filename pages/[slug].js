import Sheet from "components/Sheet";
import ActionsButton from "components/ActionsButton";
import React, { useEffect } from "react";
import Head from "next/head";
import { db } from "firebaseConfig";
import { collection, getDocs, getDoc, doc } from "firebase/firestore/lite";
import { SheetSizeState } from "store/SheetSizeState";
import { CellValueState } from "store/CellValueState";
import { useRouter } from "next/router";
import { useRecoilCallback, useSetRecoilState } from "recoil";

export default function SheetPage({ sheet, slug }) {
  const router = useRouter();
  const setSheetSize = useSetRecoilState(SheetSizeState);
  const unSlugify = (msg) => {
    return msg?.split("-").reduce((prev, curr) => {
      return `${prev} ${curr.slice(0, 1).toUpperCase()}${curr.slice(1)}`;
    }, "");
  };
  const loadSheet = useRecoilCallback(({ set }) => () => {
    if (sheet) {
      const { data, info } = sheet;
      const { rows, columns } = info;
      setSheetSize(info);
      [...Array(rows)].forEach((_, rowIndex) => {
        [...Array(columns)].forEach((_, columnIndex) => {
          const { cellValue } = data[rowIndex].row[columnIndex];
          set(CellValueState(`${rowIndex},${columnIndex}`), {
            ...cellValue,
            highlighted: false,
          });
        });
      });
    } else {
      setSheetSize({
        width: 600,
        height: 600,
        rows: 24,
        columns: 6,
      });
      [...Array(24)].forEach((_, rowIndex) => {
        [...Array(6)].forEach((_, columnIndex) => {
          set(CellValueState(`${rowIndex},${columnIndex}`), {
            value: "",
            error: false,
            highlighted: false,
          });
        });
      });
    }
  });

  useEffect(() => {
    if (localStorage.getItem("slug") === slug) {
      loadSheet();
    } else {
      localStorage.removeItem("slug");
      setTimeout(() => {
        router.push("/");
      }, 100);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          {unSlugify(slug) ? `Sheets | ${unSlugify(slug)}` : "Loading Sheet..."}
        </title>
        <link
          rel="icon"
          href="https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_spreadsheet_x16.png"
        />
      </Head>
      <Sheet />
      <ActionsButton slug={slug} />
    </>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  const sheetsRef = doc(db, "sheets", slug);
  const sheetSnap = await getDoc(sheetsRef);
  return {
    props: { sheet: sheetSnap.exists() ? sheetSnap.data() : null, slug },
  };
}
