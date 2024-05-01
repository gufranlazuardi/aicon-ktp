import { ref } from "vue";

const getApi = () => {
  const dataTable = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("https://private-46841d-dummybljr.apiary-mock.com/incentive_api/api/v1/dropdown_branch");

      if (!data.ok) {
        throw Error("No data available");
      }
      dataTable.value = await data.json();
    } catch (error) {
      error.value = error.message;
      console.log(error.value);
    }
  };

  return { dataTable, error, load };
};

export default getApi;
