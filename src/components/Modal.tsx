import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
} from "@mantine/core";
import {useForm} from "@mantine/core";

type AddExpenseModal = {
  opened: boolean;
  onClose: () => void;
  onAdd: (
    name: string, 
    amount: number | string, 
    category: string
  ) => void;
  categories?: string[];
};


export default function AddExpenseModal({opened,onClose,onAdd,categories}: AddExpenseModal) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string | number>(0);
  const [category, setCategory] = useState<string | null>(null);

  //const handleSubmit = () => {};

  // หากต้องการแปง type string เป็น type number สามารถดูตัวอย่างนี้ได้
  let val_number: number = Number("500.0");
  console.log(val_number + 100); // 600.0

  const cat = category ?? ["Food", "Transpot","Entertainment"]
   const form = useForm({
    initialValues: {
      name: "",
      amount: "" as number | "", 
      category: null as string | null, 
    },
    validateInputOnBlur: true, 
    validate: {
      
      name: (v) => (v.trim().length ? null : "Expense Name is required"), 
      
      
      amount: (v) =>
        v === "" || Number(v) <= 0 ? "Amount is required" : null,
      
      category: (v) => (v ? null : "Category is required"),
    },
  });

  const onSubmit = form.onSubmit(({ name, amount, category }) => {
    onAdd(name, Number(amount), String(category));
    form.reset();
    onClose();
  });

  return {
    /* Type additional text here. */
    <Modal opened={opened} onClose={onClose} title="Add Expense">
        <Stack>
          
          <TextInput
            label="Expense Name"
            description = "Expense Name"
            placeholder="E.g., Coca-Cola"
            withAsterisk
            {...form.getInputProps("name")}
          />

          
          <NumberInput
            label="Amount"
            description = "Amount"
            placeholder="0"
            withAsterisk
            min={1}
            {...form.getInputProps("amount")}
          /> 
          <Select
            label="Category"
            description = "Category"
            placeholder="Select Category"
            withAsterisk
            data={cat}
            {...form.getInputProps("category")}
          />

          
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Modal>
  );
}
