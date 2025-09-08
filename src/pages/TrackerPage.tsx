
import { useState } from "react";

import {
  Button,
  Stack,
  Title,
  Divider,
  Container,
  Card,
  Text,
  Group,
  Badge,
  ActionIcon,
} from "@mantine/core";
import type { MantineColor } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import AddExpenseModal from "../components/Modal";


type Expense = {
  id: string;
  name: string;
  amount: number | string;
  category: string;
};

export default function ExpenseTracker() {
 
  const [opened, setOpened] = useState(false);
 
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const categories = ["Food", "Transport", "Entertainment"];

  const colorByCategory: Record<string, MantineColor> = {
    Food: "blue",
    Transport: "blue",
    Entertainment: "blue",
  };

  
  const handleSubmit = (name: string, amount: number, category: string) => {
    setExpenses((prev) => [
      ...prev, 
      { id: uuidv4(), name, amount: Number(amount), category },
      
    ]);
  };

  
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  
  const totalsByCat: Record<string, number> = Object.fromEntries(
    categories.map((c) => [
      c,
      expenses
        .filter((e) => e.category === c)
        .reduce((s, e) => s + Number(e.amount), 0),
    ])
  );

  return (
   
    <Container style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      
      <Title order={2} mb="md">
        Record expenses
      </Title>

      
      <Button onClick={() => setOpened(true)}>Add an expense</Button> 

     
      <AddExpenseModal
        opened={opened}
        onClose={() => setOpened(false)}
        onAdd={handleSubmit}
        categories={categories}
      />

     
      <Divider my="md" />

     
      <Title order={4}>Total cost: {total} Baht</Title>
      <Stack my="sm">
        {categories.map((c) => (
          
          <div key={c}>
            {c}: {totalsByCat[c]} Baht
          </div>
        ))}
      </Stack>

      
      <Divider my="md" />

      
      <Stack>
        
        {expenses.length === 0 && <Text c="dimmed">No items yet.</Text>}

        
        {expenses.map((e) => (
          <Card key={e.id} withBorder radius="md" p="sm">
            
            <Group justify="space-between">
              
              <Group gap="md">
                <Text fw={600}>{e.name}</Text>
                <Text>{Number(e.amount)} Baht</Text>
              </Group>

              
              <Group gap="sm">
                <Badge variant="light" color={colorByCategory[e.category] ?? "gray"}>
                  {e.category.toUpperCase()}
                </Badge>

                
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() =>
                    setExpenses((prev) => prev.filter((x) => x.id !== e.id))
                  }
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
