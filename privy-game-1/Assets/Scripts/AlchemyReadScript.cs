using UnityEngine;
using Privy;
using UnityEngine.Networking;
using System.Collections;

public class AlchemyReadScript : MonoBehaviour
{
    public AlchemyResponse response;

    public string alchemyApiKey = "M2XL_vEXP3LTfrxPk7TLC";

    public async void GetNfts()
    {
        var user = await PrivyManager.Instance.GetUser();

        StartCoroutine(GetRequest("https://base-mainnet.g.alchemy.com/nft/v3/" + alchemyApiKey + "/getNFTsForOwner?owner=" + user.EmbeddedWallets[0].Address + "&withMetadata=true&pageSize=100"));

    }

    [System.Serializable]
    public class AlchemyResponse
    {
        public OwnedNft[] ownedNfts;
    }

    [System.Serializable]
    public class OwnedNft
    {
        public Contract contract;
    }


    [System.Serializable]
    public class Contract
    {
        public string address;
    }

    IEnumerator GetRequest(string uri)
    {
        bool isGoodResponse = false;

        using (UnityWebRequest webRequest = UnityWebRequest.Get(uri))
        {
            // Request and wait for the desired page.
            yield return webRequest.SendWebRequest();

            string[] pages = uri.Split('/');
            int page = pages.Length - 1;

            switch (webRequest.result)
            {
                case UnityWebRequest.Result.ConnectionError:
                case UnityWebRequest.Result.DataProcessingError:
                    Debug.LogError(pages[page] + ": Error: " + webRequest.error);
                    break;
                case UnityWebRequest.Result.ProtocolError:
                    Debug.LogError(pages[page] + ": HTTP Error: " + webRequest.error);
                    break;
                case UnityWebRequest.Result.Success:
                    Debug.Log(pages[page] + ":\nReceived: " + webRequest.downloadHandler.text);
                    response = JsonUtility.FromJson<AlchemyResponse>(webRequest.downloadHandler.text);
                    isGoodResponse = true;
                    break;
            }
        }

        for (var i = 0; i < response.ownedNfts.Length; i++)
        {
            if (response.ownedNfts[i].contract.address == swordAddress)
            {
                sword.SetActive(true);
            }

            if (response.ownedNfts[i].contract.address == bowAddress)
            {
                bow.SetActive(true);
            }

            if (response.ownedNfts[i].contract.address == staffAddress)
            {
                staff.SetActive(true);
            }
        }

    }
    public string swordAddress;
    public string bowAddress;
    public string staffAddress;

    public GameObject sword;
    public GameObject bow;
    public GameObject staff;
}
