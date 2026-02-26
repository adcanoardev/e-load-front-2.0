import HomeSection from "../../components/HomeSection/HomeSection"
import HomeSectionInstructions from "../../components/HomeSectionInstructions/HomeSectionInstructions"
import HomeSectionInfor from "../../components/HomeSectionInfor/HomeSectionInfor"
import HomeSectionMobile from "../../components/HomeSectionMobile/HomeSectionMobile"
import HomeSectionStations from "../../components/HomeSectionStations/HomeSectionStations"

const Home = () => {
  return (
    <>
      <HomeSection/>
      <HomeSectionStations/>
      <HomeSectionMobile/>
      <HomeSectionInstructions/>
      <HomeSectionInfor/>

    </>
  )
}

export default Home