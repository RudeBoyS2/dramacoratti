import { Box, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {
  url: string;
  title: string;
};

const MediaPlayer: React.FC<Props> = ({ url, title }) => {
  return (
    <>
      <Heading as="h3" my="6" ml={{base: 0, md: "4", "2xl": "8"}} size={{sm: "md", md: "lg", xl:"xl"}} fontWeight="bold" color="#000">
        {title}
      </Heading>
      <Box w="100%" h="100%">
        <iframe
          allow="autoplay"
          allowFullScreen
          allowTransparency
          src={url}
          name="videoPlayer"
          style={{ width: "95%", height: "95%", margin: "auto" }}
        />
      </Box>
    </>
  );
};

export default MediaPlayer;
