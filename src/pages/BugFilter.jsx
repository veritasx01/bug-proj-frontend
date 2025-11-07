//import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function BugFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === null) {
      params.delete(key); // remove empty values
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  //useEffect(() => {
  //  const queryObject = Object.fromEntries(searchParams);
  //  console.log(queryObject);
  //}, [searchParams]);

  return (
    <form>
      <div className="fields-container">
        <div>
          <label>Sorting Order: </label>
          <select
            value={searchParams.get("sortDir") || ""}
            onChange={(e) => updateParam("sortDir", e.target.value)}
          >
            <option value="">none</option>
            <option value="1">ascending</option>
            <option value="-1">descending</option>
          </select>
        </div>

        <div>
          <label>Title</label>
          <input
            type="text"
            value={searchParams.get("title") || ""}
            onChange={(e) => updateParam("title", e.target.value)}
          />
        </div>

        <div>
          <label>Minimum severity</label>
          <input
            type="number"
            value={searchParams.get("minSeverity") || ""}
            onChange={(e) => updateParam("minSeverity", e.target.value)}
          />
        </div>

        <div>
          <label>Labels</label>
          <select
            value={searchParams.get("labels") || ""}
            onChange={(e) => updateParam("labels", e.target.value)}
          >
            <option value="">none</option>
            <option value="unit-tests">unit-tests</option>
            <option value="hotfix">hotfix</option>
            <option value="refactor">refactor</option>
            <option value="security-check">security-check</option>
            <option value="pending-review">pending-review</option>
            <option value="merge-ready">merge-ready</option>
            <option value="deprecated">deprecated</option>
            <option value="feature-request">feature-request</option>
            <option value="bug-blocker">bug-blocker</option>
            <option value="staging">staging</option>
          </select>
        </div>

        <div>
          <label>Sorting Criterion:</label>
          <select
            value={searchParams.get("sortBy") || ""}
            onChange={(e) => updateParam("sortBy", e.target.value)}
          >
            <option value="">none</option>
            <option value="title">Title</option>
            <option value="severity">Severity</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>
      </div>
    </form>
  );
}
