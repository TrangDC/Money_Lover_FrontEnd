// <block:actions:2>

// import {
//     Card,
//     CardBody,
//     CardHeader,
//     Typography,
// } from "@material-tailwind/react";
// import Chart from "react-apexcharts";
// import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// const chartConfig = {
//     type: "bar",
//     height:440,
//     width:1900,
//
//     series: [
//         {
//             name: "Sales",
//             data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
//         },
//     ],
//     options: {
//         chart: {
//             toolbar: {
//                 show: false,
//             },
//         },
//         title: {
//             show: "",
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         colors: ["#020617"],
//         plotOptions: {
//             bar: {
//                 columnWidth: "50%",
//                 borderRadius: 2,
//             },
//         },
//         xaxis: {
//             axisTicks: {
//                 show: false,
//             },
//             axisBorder: {
//                 show: false,
//             },
//             labels: {
//                 style: {
//                     colors: "#616161",
//                     fontSize: "20px",
//                     fontFamily: "inherit",
//                     fontWeight: 400,
//                 },
//             },
//             categories: [
//                 "Apr",
//                 "May",
//                 "Jun",
//                 "Jul",
//                 "Aug",
//                 "Sep",
//                 "Oct",
//                 "Nov",
//                 "Dec",
//             ],
//         },
//         yaxis: {
//             labels: {
//                 style: {
//                     colors: "#616161",
//                     fontSize: "20px",
//                     fontFamily: "inherit",
//                     fontWeight: 400,
//                 },
//             },
//         },
//         grid: {
//             show: true,
//             borderColor: "#dddddd",
//             strokeDashArray: 5,
//             xaxis: {
//                 lines: {
//                     show: true,
//                 },
//             },
//             padding: {
//                 top: 5,
//                 right: 20,
//             },
//         },
//         fill: {
//             opacity: 0.8,
//         },
//         tooltip: {
//             theme: "dark",
//         },
//     },
// };

// export default function Example() {
//     return (
//         <div><Card>
//             <CardHeader
//                 floated={false}
//                 shadow={false}
//                 color="transparent"
//                 className="flex flex-col gap-10 rounded-none md:flex-row md:items-center"
//             >
//                 <div className="text-sm h1">
//                     Tổng Cộng:
//                 </div>
//                 <div>
//                     <Typography variant="h1" color="red">
//                         1,001,003,000.0
//                     </Typography>
//                     <Typography
//                         variant="small"
//                         color="gray"
//                         className="max-w-sm font-normal"
//                     >
//                     </Typography>
//                 </div>
//             </CardHeader>
//
//             <CardBody className="px-2 pb-0">
//                 <Chart {...chartConfig} />
//             </CardBody>
//         </Card></div>
//
//     );
// }