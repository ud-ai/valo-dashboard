
import { getAgentImageUrl, getMapImageUrl, AGENT_UUIDS, MAP_UUIDS } from './valorant-data';

describe('Valorant Data Helpers', () => {
    describe('getAgentImageUrl', () => {
        it('returns the correct URL for a known agent', () => {
            const agentName = 'Jett';
            const expectedUuid = AGENT_UUIDS[agentName];
            const result = getAgentImageUrl(agentName);
            expect(result).toBe(`https://media.valorant-api.com/agents/${expectedUuid}/displayicon.png`);
        });

        it('returns the correct URL for an agent with extra whitespace', () => {
            const agentName = '  Phoenix  ';
            const expectedUuid = AGENT_UUIDS['Phoenix'];
            const result = getAgentImageUrl(agentName);
            expect(result).toBe(`https://media.valorant-api.com/agents/${expectedUuid}/displayicon.png`);
        });

        it('returns empty string for an unknown agent', () => {
            const result = getAgentImageUrl('UnknownAgent');
            expect(result).toBe('');
        });
    });

    describe('getMapImageUrl', () => {
        it('returns the correct URL for a known map', () => {
            const mapName = 'Ascent';
            const expectedUuid = MAP_UUIDS[mapName];
            const result = getMapImageUrl(mapName);
            expect(result).toBe(`https://media.valorant-api.com/maps/${expectedUuid}/splash.png`);
        });

        it('returns fallback URL for an unknown map', () => {
            const result = getMapImageUrl('UnknownMap');
            expect(result).toBe('/maps/default.jpg');
        });
    });
});
