import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
} from "@mantine/core";
import {usefrom} from "@mantine/core";

type AddExpenseModalProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: (
    name: string, 
    amount: number | string, 
    category: string
  ) => void;
};


export default function AddExpenseModal({opened,onClose,onAdd,category}: AddExpenseModalProps) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string | number>(0);
  const [category, setCategory] = useState<string | null>(null);

  const handleSubmit = () => {};

  // หากต้องการแปง type string เป็น type number สามารถดูตัวอย่างนี้ได้
  let val_number: number = Number("500.0");
  console.log(val_number + 100); // 600.0

  const cat = catagory ?? ["Food", "Transpot",]
  const from = usefrom({
    intitialValue:{
    name : "",
    amount : "" as number | "",
    category : null as string | null
    },
    validateInputOnBlur :true,
    validate:{
     name: (v) => (v.trim().length ? null : "Expense Name is required"), //ถ้าจริงคืนค่า null
      amount: (v) =>
        v === "" || Number(v) <= 0 ? "Amount is required" : null,
      category: (v) => (v ? null : "Category is required"),
    },
  });

  }
  return {
    /* Type additional text here. */
  };
}
