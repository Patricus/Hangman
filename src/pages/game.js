// This is the game page

import { useRouter } from "next/router";

function word() {
  const router = useRouter();
  const { word } = router.query;
  return <div>word</div>;
}

export default word;
