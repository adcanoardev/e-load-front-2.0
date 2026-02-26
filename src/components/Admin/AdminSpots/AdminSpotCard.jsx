import { Card, CardHeader, GridItem, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import AdminSpotCardInfo from "./AdminSpotCardInfo";
import AdminSpotCardUpdate from "./AdminSpotCardUpdate";
import AdminSpotCardDeleteAlert from "./AdminSpotCardDeleteAlert";

const AdminSpotCard = ({ spot }) => {
    const [showInfo, setShowInfo] = useState(true);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    let imgSrc;
    switch (spot.type) {
        case "Schuko":
            imgSrc = "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-schuko_vov9iu.png";
            break;
        case "Type2":
            imgSrc = "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-type2_o9hlej.png";
            break;
        case "CCS2":
            imgSrc = "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-ccs2_ziy7mo.png";
            break;
        case "CHAdeMO":
            imgSrc = "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-chademo_amtfq9.png";
            break;
        default:
            imgSrc = "https://res.cloudinary.com/dgkm71mjf/image/upload/v1686421429/e-load/conector-type2_o9hlej.png";
            break;
    }

    return (
        <GridItem key={spot._id} w="250px">
            <Card height={"350px"} width={250} border="1px solid" borderColor="grayColor">
                <CardHeader margin={0} py={1} display="flex" justifyContent="center">
                    <Image boxSize="100px" objectFit="contain" mt={3} src={imgSrc} />
                </CardHeader>
                {showInfo && (
                    <AdminSpotCardInfo
                        spot={spot}
                        setShowInfo={setShowInfo}
                        setShowUpdate={setShowUpdate}
                        setShowDeleteAlert={setShowDeleteAlert}
                    />
                )}
                {showUpdate && (
                    <AdminSpotCardUpdate spot={spot} setShowInfo={setShowInfo} setShowUpdate={setShowUpdate} />
                )}
                {showDeleteAlert && (
                    <AdminSpotCardDeleteAlert
                        spot={spot}
                        setShowInfo={setShowInfo}
                        setShowDeleteAlert={setShowDeleteAlert}
                    />
                )}
            </Card>
        </GridItem>
    );
};
AdminSpotCard.propTypes = {
    spot: PropTypes.object,
};

export default AdminSpotCard;
