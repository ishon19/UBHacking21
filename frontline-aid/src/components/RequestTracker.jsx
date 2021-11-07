import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getStatus } from "../services/RequestStatusService";
import { useSnackbar } from "notistack";

const columns = [
  { field: "id", headerName: "S.No", width: 300 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
    editable: false,
  },
  {
    field: "type",
    headerName: "Request Type",
    width: 300,
    editable: false,
  },
  {
    field: "status",
    headerName: "Request Status",
    width: 300,
    editable: true,
  },
];

export default function RequestTracker() {
  const [data, setData] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log("RequestTracker");
    const res = async () => {
      const data = await getStatus();
      if (data.length > 0) {
        setData(data);
        enqueueSnackbar("Status fetched successfully", {
          variant: "success",
          timeout: 5000,
        });
      }
    };
    res();
  }, [enqueueSnackbar]);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pstatusSize={5}
        rowsPerPstatusOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
