import { useDropmojisCollectionContract } from "../hooks/useDropmojisCollectionContract";
import { useTonConnect } from "../hooks/useTonConnect";
import MediaCard from "./MediaCard";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";

export function DropmojisCollection() {
  const { connected, wallet } = useTonConnect();
  const { mint } = useDropmojisCollectionContract();

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>DropmojisCollection</h3>
        <FlexBoxRow>
          <MediaCard />
        </FlexBoxRow>

        <Button disabled={!connected} onClick={mint}>
          Mint Dropmojis
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
