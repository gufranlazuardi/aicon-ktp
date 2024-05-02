<script lang="ts">
import { ref, onMounted } from "vue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SampleData {
  text: string;
  value: string;
}

export default {
  components: {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  },
  setup() {
    const tableData = ref<SampleData[]>([]);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://private-46841d-dummybljr.apiary-mock.com/incentive_api/api/v1/dropdown_branch"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("data", data);
        tableData.value = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return { tableData };
  },
};
</script>

<template>
  <div class="flex mt-10 mx-auto justify-center" v-if="tableData.length > 0">
    <Table class="w-[1000px]">
      <TableHeader>
        <TableRow>
          <TableHead>Text</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(data, index) in tableData" :key="index">
          <TableCell>{{ data.text }}</TableCell>
          <TableCell>{{ data.value }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
