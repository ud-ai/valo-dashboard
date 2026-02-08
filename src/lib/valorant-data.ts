
// This file maps agent and map names to their Valorant API UUIDs.
// Data sourced from https://valorant-api.com/v1/agents and https://valorant-api.com/v1/maps

export const AGENT_UUIDS: Record<string, string> = {
    "Gekko": "e370fa57-4757-3604-3648-499e1f642d3f",
    "Fade": "dade69b4-4f5a-8528-247b-219e5a1facd6",
    "Breach": "5f8d3a7f-467b-97f3-062c-13acf203c006",
    "Deadlock": "cc8b64c8-4b25-4ff9-6e7f-37b4da43d235",
    "Tejo": "b444168c-4e35-8076-db47-ef9bf368f384",
    "Raze": "f94c3b30-42be-e959-889c-5aa313dba261",
    "Chamber": "22697a3d-45bf-8dd7-4fec-84a9e28c69d7",
    "KAY/O": "601dbbe7-43ce-be57-2a40-4abd24953621",
    "Skye": "6f2a04ca-43e0-be17-7f36-b3908627744d",
    "Cypher": "117ed9e3-49f3-6512-3ccf-0cada7e3823b",
    "Sova": "320b2a48-4d9b-a075-30f1-1f93a9b638fa",
    "Killjoy": "1e58de9c-4950-5125-93e9-a0aee9f98746",
    "Harbor": "95b78ed7-4637-86d9-7e41-71ba8c293152",
    "Vyse": "efba5359-4016-a1e5-7626-b1ae76895940",
    "Viper": "707eab51-4836-f488-046a-cda6bf494859",
    "Phoenix": "eb93336a-449b-9c1b-0a54-a891f7921d69",
    "Veto": "92eeef5d-43b5-1d4a-8d03-b3927a09034b",
    "Astra": "41fb69c1-4189-7b37-f117-bcaf1e96f1bf",
    "Brimstone": "9f0d8ba9-4140-b941-57d3-a7ad57c6b417",
    "Iso": "0e38b510-41a8-5780-5e8f-568b2a4f2d6c",
    "Clove": "1dbf2edd-4729-0984-3115-daa5eed44993",
    "Neon": "bb2a4828-46eb-8cd1-e765-15848195d751",
    "Yoru": "7f94d92c-4234-0a36-9646-3a87eb8b5c89",
    "Waylay": "df1cb487-4902-002e-5c17-d28e83e78588",
    "Sage": "569fdd95-4d10-43ab-ca70-79becc718b46",
    "Reyna": "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
    "Omen": "8e253930-4c05-31dd-1b6c-968525494517",
    "Jett": "add6443a-41bd-e414-f6ad-e58d267f4e95"
};

export const MAP_UUIDS: Record<string, string> = {
    "Ascent": "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
    "Split": "d960549e-485c-e861-8d71-aa9d1aed12a2",
    "Fracture": "b529448b-4d60-346e-e89e-00a4c527a405",
    "Bind": "2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba",
    "Breeze": "2fb9a4fd-47b8-4e7d-a969-74b4046ebd53",
    "Lotus": "2fe4ed3a-450a-948b-6d6b-e89a78e680a9",
    "Sunset": "92584fbe-486a-b1b2-9faa-39b0f486b498",
    "Pearl": "fd267378-4d1d-484f-ff52-77821ed10dc2",
    "Icebox": "e2ad5c54-4114-a870-9641-8ea21279579a",
    "Haven": "2bee0dc9-4ffe-519b-1cbd-7fbe763a6047",
    "Abyss": "224b0a95-48b9-f703-1bd8-67aca101a61f",
    "Corrode": "1c18ab1f-420d-0d8b-71d0-77ad3c439115",
    "The Range": "ee613ee9-28b7-4beb-9666-08db13bb2244",
    "District": "690b3ed2-4dff-945b-8223-6da834e30d24",
    "Kasbah": "12452a9d-48c3-0b02-e7eb-0381c3520404",
    "Piazza": "de28aa9b-4cbe-1003-320e-6cb3ec309557"
};

export const getAgentImageUrl = (agentName: string): string => {
    const normalizedName = agentName.trim();
    const uuid = AGENT_UUIDS[normalizedName];
    if (!uuid) return ""; // Return empty string if not found, let caller handle fallback
    return `https://media.valorant-api.com/agents/${uuid}/displayicon.png`;
};

export const getMapImageUrl = (mapName: string): string => {
    const normalizedName = mapName.trim();
    const uuid = MAP_UUIDS[normalizedName];
    if (!uuid) return "/maps/default.jpg"; // Or empty string, but map images usually need a fallback
    return `https://media.valorant-api.com/maps/${uuid}/splash.png`;
};
export const getRankImageUrl = (rank: string): string => {
    if (!rank) return "";

    // Normalize rank string to handle case sensitivity and extra spaces
    const r = rank.toLowerCase().trim();

    const TIER_UUID = "03621f52-4428-b332-236b-0961a3086035"; // Episode 5

    let tier = 0;


    if (r.includes("radiant")) tier = 27;
    else if (r.includes("immortal")) {
        if (r.includes("3")) tier = 26;
        else if (r.includes("2")) tier = 25;
        else tier = 24;
    }
    else if (r.includes("ascendant")) {
        if (r.includes("3")) tier = 23;
        else if (r.includes("2")) tier = 22;
        else tier = 21;
    }
    else if (r.includes("diamond")) {
        if (r.includes("3")) tier = 20;
        else if (r.includes("2")) tier = 19;
        else tier = 18;
    }
    else if (r.includes("platinum")) {
        if (r.includes("3")) tier = 17;
        else if (r.includes("2")) tier = 16;
        else tier = 15;
    }
    else if (r.includes("gold")) {
        if (r.includes("3")) tier = 14;
        else if (r.includes("2")) tier = 13;
        else tier = 12;
    }
    else if (r.includes("silver")) {
        if (r.includes("3")) tier = 11;
        else if (r.includes("2")) tier = 10;
        else tier = 9;
    }
    else if (r.includes("bronze")) {
        if (r.includes("3")) tier = 8;
        else if (r.includes("2")) tier = 7;
        else tier = 6;
    }
    else if (r.includes("iron")) {
        if (r.includes("3")) tier = 5;
        else if (r.includes("2")) tier = 4;
        else tier = 3;
    }

    if (tier === 0) return "";

    // Use custom asset for Immortal/Radiant if available
    if (r.includes("immortal") || r.includes("radiant")) return "/ranks/immortal_rank.png";


    return `https://media.valorant-api.com/competitivetiers/${TIER_UUID}/${tier}/largeicon.png`;
};

