<script lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Layout from "../components/Layout.vue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ref, computed } from "vue";

interface Data {
  name: string;
  email: string;
  address: string;
  ktp_number: string;
  gender: string;
  birthdate: string;
}

export default {
  components: {
    Layout,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  },
  setup() {
    const tableData = ref<Data[]>([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        address: "123 Main St, Anytown",
        ktp_number: "1234567890123456",
        gender: "Male",
        birthdate: "1990-01-01",
      },
      {
        name: "bragas",
        email: "bragas@example.com",
        address: "Harapan Jaya, Bekasi Utara",
        ktp_number: "1234567890123456",
        gender: "Male",
        birthdate: "1990-01-01",
      },
      {
        name: "Amin",
        email: "amin@example.com",
        address: "Tambun, Bekasi Timur",
        ktp_number: "1234567890123456",
        gender: "Male",
        birthdate: "1990-01-01",
      },
      {
        name: "Rizka",
        email: "rizka@example.com",
        address: "Duta Harapan, Bekasi Utara ",
        ktp_number: "1234567890123456",
        gender: "Female",
        birthdate: "1990-01-01",
      },
    ]);

    // state
    const search = ref<string>("");
    const selectedGender = ref<string>("");

    // filter & search
    const filteredPeople = computed(() => {
      let filtered = tableData.value;

      // search
      if (search.value) {
        filtered = filtered.filter(
          (data: any) =>
            data.name.toLowerCase().includes(search.value.toLowerCase()) ||
            data.email.toLowerCase().includes(search.value.toLowerCase())
        );
      }

      // filter
      if (selectedGender.value && selectedGender.value !== "All Genders") {
        filtered = filtered.filter((person: any) => person.gender === selectedGender.value);
      }

      return filtered;
    });

    // new data state
    const newData = ref<Data>({
      name: "",
      email: "",
      address: "",
      ktp_number: "",
      gender: "",
      birthdate: "",
    });

    // save ke local storage
    const saveData = () => {
      try {
        tableData.value.push(newData.value);
        localStorage.setItem("tableData", JSON.stringify(tableData.value));

        // Clear the input fields after saving
        newData.value = {
          name: "",
          email: "",
          address: "",
          ktp_number: "",
          gender: "",
          birthdate: "",
        };
      } catch (error: any) {
        throw new Error(error.value);
      }
    };

    return { tableData, search, selectedGender, filteredPeople, saveData, newData };
  },
};
</script>

<template>
  <Layout>
    <div class="flex flex-col mt-10">
      <p class="mx-auto text-xl">Table of ID</p>

      <!-- tombol -->
      <div class="flex mx-auto">
        <Button class="mt-10">
          <Dialog>
            <DialogTrigger class="text-white"> Add Data </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Please fill the form below</DialogTitle>
                <div class="flex gap-2 mt-2">
                  <div>
                    <p class="py-1">Name</p>
                    <p class="py-1">Email</p>
                    <p class="py-1">Address</p>
                    <p class="py-1">KTP Number / NIK</p>
                    <p class="py-1">Gender</p>
                    <p class="py-1">Birthdate</p>
                  </div>
                  <div>
                    <p class="py-1">:</p>
                    <p class="py-1">:</p>
                    <p class="py-1">:</p>
                    <p class="py-1">:</p>
                    <p class="py-1">:</p>
                    <p class="py-1">:</p>
                  </div>
                  <div class="flex flex-col">
                    <input type="text" placeholder="Ahmad" class="placeholder:italic py-1" v-model="newData.name" />
                    <input
                      type="email"
                      placeholder="ahmad@gmail.com"
                      class="placeholder:italic py-1"
                      v-model="newData.email"
                    />
                    <input
                      type="text"
                      placeholder="Jakarta Utara"
                      class="placeholder:italic py-1"
                      v-model="newData.address"
                    />
                    <input
                      type="text"
                      placeholder="3276281898090011"
                      class="placeholder:italic py-1"
                      v-model="newData.ktp_number"
                    />
                    <select v-model="newData.gender" class="py-1">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <input
                      type="date"
                      placeholder="17-12-1998"
                      class="placeholder:italic py-1"
                      v-model="newData.birthdate"
                    />
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter>
                <Button @click="saveData">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Button>
      </div>

      <!-- Search and Filter -->
      <div class="flex gap-2 mt-10 mx-auto">
        <div class="border rounded-md px-2 py-1">
          <input type="text" placeholder="Find name..." v-model="search" />
        </div>
        <select v-model="selectedGender">
          <option>All Genders</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <!-- table container -->
      <div class="flex mt-10 mx-auto justify-center">
        <Table class="w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px]"> Name </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>KTP Number</TableHead>

              <TableHead>Gender </TableHead>

              <TableHead>Birthdate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="data in filteredPeople" :key="data.gender">
              <TableCell> {{ data.name }}</TableCell>
              <TableCell> {{ data.email }}</TableCell>
              <TableCell> {{ data.address }}</TableCell>
              <TableCell> {{ data.ktp_number }}</TableCell>
              <TableCell> {{ data.gender }}</TableCell>
              <TableCell> {{ data.birthdate }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </Layout>
</template>
