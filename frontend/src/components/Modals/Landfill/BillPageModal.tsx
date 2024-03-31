import { API_END_POINTS, BASE_URL } from "@/constants/Service";
import ModalLayout from "@/layout/ModalLayout";
import { IBill, IDumpingEntry } from "@/models/Landfill";
import BillPage from "@/pages/BillPage";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface BillPageModalProps {
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
  data: IDumpingEntry | undefined;
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json()); // Fetcher function for SWR

const BillPageModal: React.FC<BillPageModalProps> = ({
  isOpen,
  customClass = "w-[620px] flex flex-col justify-center item-center",
  onClose,
  data,
}) => {
  const [dumpingBills, setDumpingBills] = useState<IBill>();

  const { data: bills } = useSWR<IBill>(
    `${BASE_URL}${API_END_POINTS.TRIP}/${data?.trip_id}/bills`,
    fetcher
  );

  useEffect(() => {
    if (bills) {
      console.log("DETAILS ", data);
      console.log("BILL: ", bills);
      setDumpingBills(bills);
    }
  }, [bills, data]);

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      headline={"Dumping Bills"}
      customClass={customClass}
    >
      ..
      {dumpingBills && <BillPage result={dumpingBills} />}
    </ModalLayout>
  );
};

export default BillPageModal;
