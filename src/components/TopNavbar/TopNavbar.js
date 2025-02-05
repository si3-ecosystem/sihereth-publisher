import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100px;

    color: black;

    top: 0;
    left: 0;
    z-index: 1000; /* Ensures it stays above other elements */
`;

const Wrapper = styled.div`
    width: 100vw;
    height: 100px;
    display: flex;
    justify-content: space-between; /* Adjusted for proper alignment */
    align-items: center;
    padding: 10px 20px;
    gap: 164px;
`;

const Left = styled.div`
    flex: 1;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 70%;
    max-width: 70%;
`;

const Right = styled.div`
    flex: 1;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative; /* To position the embeds absolutely within this container */
`;

const Header = styled.h6`
    font-size: 17px;
    margin: auto;
`;

const Button = styled.button`
    height: 55px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: white;

    color: black;
    border: 1px solid black;
    font-weight: 500;
    border-radius: 0.5rem;
    font-size: 12px;
    padding: 0.375rem 1.25rem;
    margin: 0 10px;

    &:hover {
        background-color: #a3a3a3;
        color: white;
    }

    &:focus {
        outline: none;
    }

    &.dark {
        background-color: #dc2626;
        &:hover {
            background-color: #b91c1c;
        }
        &:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.5);
        }
    }
`;

const IframeContainer = styled.div`
    display: ${({ show }) => (show ? "block" : "none")};
    position: absolute;
    top: 110px;
    right: 0;
    width: 300px; /* Adjust width as needed */
    background-color: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 10px;
    z-index: 2000; /* Ensure it's above other elements */
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 200px; /* Adjust height as needed */
    background: transparent;
    border: 1px solid #ccc;
    margin-bottom: 10px;
`;

const TopOfNavbar = () => {
    const [showConferences, setShowConferences] = useState(false);
    const [showPodcasts, setShowPodcasts] = useState(false);
    const [showLivepeer, setShowLivepeer] = useState(false);
    const [showAurpay, setShowAurpay] = useState(false);

    const toggleConferences = () => setShowConferences(!showConferences);
    const togglePodcasts = () => setShowPodcasts(!showPodcasts);
    const toggleLivepeer = () => setShowLivepeer(!showLivepeer);
    const toggleAurpay = () => setShowAurpay(!showAurpay);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Header>Tutorial Videos</Header>
                    <Button onClick={toggleLivepeer}>Audiogram Tutorial</Button>
                    <Button onClick={toggleAurpay}>Aurpay Tutorial</Button>

                    <IframeContainer show={showLivepeer}>
                        <Iframe
                            src="https://player.vimeo.com/video/929333857?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                            title="Activate Your Media With Livepeer"
                        ></Iframe>
                    </IframeContainer>
                    <IframeContainer show={showAurpay}>
                        <Iframe
                            src="https://player.vimeo.com/video/929334312?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                            title="Activate Your Crypto Payment Gateway With Aurpay"
                        ></Iframe>
                    </IframeContainer>
                </Left>

                <Right>
                    <Button onClick={toggleConferences}>Conferences</Button>
                    <Button onClick={togglePodcasts}>Podcasts</Button>

                    <IframeContainer show={showConferences}>
                        <Iframe
                            className="airtable-embed"
                            src="https://airtable.com/embed/appGIQrU1Lv6MOgvQ/shrYDbZ9YLA7S51zy?viewControls=on"
                        ></Iframe>
                    </IframeContainer>
                    <IframeContainer show={showPodcasts}>
                        <Iframe
                            className="airtable-embed"
                            src="https://airtable.com/embed/appGIQrU1Lv6MOgvQ/shrb3cmaWpPv6IEi1?viewControls=on"
                        ></Iframe>
                    </IframeContainer>

                    <Header>Si Her Speak</Header>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default TopOfNavbar;
