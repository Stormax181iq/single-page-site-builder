import { useEffect } from "react";
import { useState } from "react";

import sitesService from "../services/sitesService";

import Header from "../components/Header";
import UserSiteCard from "../components/UserSiteCard";

export default function MySites() {
  const [userSites, setUserSites] = useState([]);

  useEffect(() => {
    async function fetchUserSites() {
      const sites = await sitesService.getUserSites();
      setUserSites(sites);
    }

    fetchUserSites();
  }, []);

  return (
    <>
      <Header />
      {userSites ? (
        userSites.map((userSite, i) => {
          return (
            <UserSiteCard
              key={i}
              templateId={userSite.template_id}
              createdAt={userSite.created_at}
              values={userSite.values}
            />
          );
        })
      ) : (
        <p>You don’t have any website yet !</p>
      )}
    </>
  );
}
