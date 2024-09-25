import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Home() {
  return (
    <>
      <Typography
        variant="p"
        color="initial"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        hey go to : <Link href="http://localhost:3000/addfile"> localhost:3000/addfile</Link>
      </Typography>
    </>
  );
}
