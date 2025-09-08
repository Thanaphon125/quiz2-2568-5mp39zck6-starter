
import { Card, Group, Badge, ActionIcon, Text } from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";


type ExpenseCardProps = {
  id: string;                      
  name: string;                     
  amount: number | string;          
  category: string;               
  onDelete: (id: string) => void;   
};


export default function ExpenseCard({ id, name, amount, category, onDelete }: ExpenseCardProps) {
  
  const val_number: number = Number("500.0");
  console.log(val_number + 100); // 600.0

  
  const displayAmount = Number(amount);

  return (
    
    <Card withBorder radius="md" p="sm" mb="sm">
     
      <Group justify="space-between">
       
        <Group gap="md">
          <Text fw={600}>{name}</Text>                
          <Text>{displayAmount} Baht</Text>             
        </Group>

        
        <Group gap="sm">
         
          <Badge
            color={
              category === "Food"
                ? "green"       
                : category === "Transport"
                ? "blue"        
                : "violet"       
            }
            variant="light"      
          >
            {category.toUpperCase()}                    
          </Badge>

          
          <ActionIcon color="red" variant="light" onClick={() => onDelete(id)}>
            <IconTrash size={18} />                    
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
