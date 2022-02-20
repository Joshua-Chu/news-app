import { Box, Heading } from "@chakra-ui/react";
import Image from "next/image";

const data = {
    id: "29cade65-ae8d-4901-bc66-aaa0addb2993",
    title: "This is React Mehn",
    content:
        '<p>The "variant" field of UUIDs, or the&nbsp;<em>N</em>&nbsp;position indicate their format and encoding. RFC 4122 defines four variants of lengths 1 to 3 bits:</p><ul><li>Variant 0 (indicated by the one-bit pattern 0xxx<sub>2</sub>,&nbsp;<em>N</em>&nbsp;=&nbsp;<code style="color: rgb(0, 0, 0); background-color: rgb(248, 249, 250);">0..7</code>) is for backwards compatibility with the now-obsolete Apollo&nbsp;<a href="https://en.wikipedia.org/wiki/Network_Computing_System" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">Network Computing System</a>&nbsp;1.5 UUID format developed around 1988. The first 6 octets of the UUID are a 48-bit timestamp (the number of 4-microsecond units of time since 1 January 1980 UTC); the next 2 octets are reserved; the next octet is the "address family"; and the final 7 octets are a 56-bit host ID in the form specified by the address family. Though different in detail, the similarity with modern version-1 UUIDs is evident. The variant bits in the current UUID specification coincide with the high bits of the address family octet in NCS UUIDs. Though the address family could hold values in the range 0..255, only the values 0..13 were ever defined. Accordingly, the variant-0 bit pattern&nbsp;<code style="color: rgb(0, 0, 0); background-color: rgb(248, 249, 250);">0xxx</code>&nbsp;avoids conflicts with historical NCS UUIDs, should any still exist in databases.<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier#cite_note-13" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[13]</sup></a></li><li>Variant 1 (10xx<sub>2</sub>,&nbsp;<em>N</em>&nbsp;=&nbsp;<code style="color: rgb(0, 0, 0); background-color: rgb(248, 249, 250);">8..b</code>, 2 bits) are referred to as RFC 4122/DCE 1.1 UUIDs, or "Leach–Salz" UUIDs, after the authors of the original&nbsp;<a href="https://en.wikipedia.org/wiki/Internet_Draft" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">Internet Draft</a>.</li><li>Variant 2 (110x<sub>2</sub>,&nbsp;N&nbsp;=&nbsp;<code style="color: rgb(0, 0, 0); background-color: rgb(248, 249, 250);">c..d</code>, 3 bits) is characterized in the RFC as "reserved, Microsoft Corporation backward compatibility" and was used for early GUIDs on the&nbsp;<a href="https://en.wikipedia.org/wiki/Microsoft_Windows" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">Microsoft Windows</a>&nbsp;platform. It differs from variant 1 only by the endianness in binary storage or transmission: variant-1 UUIDs use "network" (big-endian) byte order, while variant-2 GUIDs use "native" (little-endian) byte order for some subfields of the UUID.</li><li>Reserved is defined as the 3-bit variant bit pattern 111x<sub>2</sub>&nbsp;(<em>N</em>&nbsp;=&nbsp;<code style="color: rgb(0, 0, 0); background-color: rgb(248, 249, 250);">e..f</code>).</li></ul><p>Variants 1 and 2 are used by the current UUID specification. In their textual representations, variants 1 and 2 are the same, except for the variant bits. In the binary representation, there is an endianness difference.<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier#cite_note-RFC_4122-1" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[1]</sup></a>&nbsp;When byte swapping is required to convert between the big-endian byte order of variant 1 and the little-endian byte order of variant 2, the fields above define the swapping. The first three fields are unsigned 32- and 16-bit integers and are subject to swapping, while the last two fields consist of uninterpreted bytes, not subject to swapping. This byte swapping applies even for versions 3, 4, and 5, where the canonical fields do not correspond to the content of the UUID.<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier#cite_note-RFC_4122-1" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[1]</sup></a></p><p>While some important GUIDs, such as the identifier for the&nbsp;<a href="https://en.wikipedia.org/wiki/Component_Object_Model" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">Component Object Model</a>&nbsp;<a href="https://en.wikipedia.org/wiki/IUnknown" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);">IUnknown</a>&nbsp;interface, are nominally variant-2 UUIDs, many identifiers generated and used in Microsoft Windows software and referred to as "GUIDs" are standard variant-1 RFC 4122/DCE 1.1 network-byte-order UUIDs, rather than little-endian variant-2 UUIDs. The current version of the Microsoft&nbsp;<code style="color: rgb(0, 0, 0); background-color: rgb(248, 249, 250);">guidgen</code>&nbsp;tool produces standard variant-1 UUIDs. Some Microsoft documentation states that "GUID" is a synonym for "UUID",<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier#cite_note-14" rel="noopener noreferrer" target="_blank" style="color: rgb(6, 69, 173);"><sup>[14]</sup></a>&nbsp;as standardized in RFC 4122. RFC 4122 itself states that UUIDs "are also known as GUIDs". All this suggests that "GUID", while originally referring to a variant of UUID used by Microsoft, has become simply an alternative name for UUID, with both variant-1 and variant-2 GUIDs being extant.</p>',
    created_at: "2022-02-20T02:15:35.945958+00:00",
    banner: "https://res.cloudinary.com/dlfecpmkj/image/upload/v1645323334/news-upload/c2vrqcqx0tczhpbag8us.png",
    author: {
        id: "3b889333-4735-4fe4-a2cf-dca2e65a1a04",
        email: "hey@hey.com",
        profile_photo:
            "https://res.cloudinary.com/dlfecpmkj/image/upload/v1645322046/news-upload/llgtway129crljlkibzp.png",
    },
};

const NewsDetails = () => {
    return (
        <Box>
            <Heading as="h2" textAlign="center" mb="32px">
                {data.title}
            </Heading>
            <Box
                position="relative"
                h="350px"
                width={{ base: "100vw", lg: "auto" }}
                left={{ base: "50%", lg: "unset" }}
                right={{ base: "50%", lg: "unset" }}
                ml={{ base: "-50vw", lg: "unset" }}
                mr={{ base: "-50vw", lg: "unset" }}
            >
                <Image src={data.banner} layout="fill" objectFit="cover" />
            </Box>
        </Box>
    );
};

export default NewsDetails;
