import blizzApi from '@common/battleNet/api';
import { apiUrl } from '@constants/.';

interface CharacterData {
  realm: string;
  name: string;
  url?: string;
}

type mPlusData = { keystone_level: number | string };
function sortMythicPlusByHigher(a: mPlusData, b: mPlusData) {
  if (a.keystone_level > b.keystone_level) return -1;
  if (a.keystone_level < b.keystone_level) return 1;

  return 0;
}

function findAchievement({ reputations = [] }) {
  const archivistData = reputations.find(({ faction }) => faction.id === 2478);

  const tier = archivistData?.standing?.name?.[0] || 'U';
  const value = archivistData?.standing?.value || 0;

  return `${tier} ${value}`;
}

const getCharacterData = async (data: CharacterData) => {
  try {
    const { realm, name, url = '' } = data;
    const payload: CharacterData = { realm, name };

    const [{ data: character }, { data: items }, { data: mPlus }, { data: achievements }] =
      await Promise.all([
        blizzApi.get(apiUrl.character, payload),
        blizzApi.get(apiUrl.equipment, payload),
        blizzApi.get(apiUrl.mythicPlus, payload),
        blizzApi.get(apiUrl.reputation, payload),
      ]);

    const avatar = await fetchAvatar(character.media.href);
    const reputation = findAchievement(achievements);
    const highestRun = mPlus?.current_period?.best_runs?.sort(sortMythicPlusByHigher)?.[0];

    const feed = {
      ...data,
      url,
      avatar,
      reputation,
      lastUpdate: Date.now(),
      lastModified: character.last_login_timestamp,
      ilevel: character.equipped_item_level,
      mscore: mPlus?.current_mythic_rating?.rating || 0,
      mythicweekly: highestRun?.dungeon?.name || '',
      mythicweeklylvl: highestRun?.keystone_level || '',
      mythicRuns: mPlus?.current_period?.best_runs?.length || '',
      covenant: character?.covenant_progress?.chosen_covenant?.name || '',
      renown: character?.covenant_progress?.renown_level || '',
      legendary: items.level || '',
      legendarySlot: items.slot || '',
      error: false,
    };

    return feed;
  } catch (error) {
    console.log(error, { name: data?.name });

    return { ...data, error: true };
  }
};

export default getCharacterData;
