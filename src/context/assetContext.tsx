import axios from "axios";
import { count } from "console";
import { useLocation } from "react-router-dom";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

interface Asset {
  asset_id: number;
  asset_name: string;
  category_id: string;
  sub_category_id: string | null;
  type_id: string | null;
  location: string | null;
  availability_status_id: string;
  serial_number: string;
  specifications: string;
  asset_amount: number;
  warranty_duration: number;
  warranty_due_date: Date;
  purchase_date: Date;
  notes: string;
  file: File;
  brand: string;
  insurance: string;
  status_id: string;
  asset_condition_id: string;
}
interface AssetContextType {
  assets: Asset[];
  insertAsset: (asset: Asset) => void;
  categoryID: number | null;
  externalAssets: Asset[];
  filteredAssets: Asset[];
  setCategoryID: Dispatch<SetStateAction<number | null>>; 
  setSubCategoryID: Dispatch<SetStateAction<number | null>>; 
  setTypeID: Dispatch<SetStateAction<number | null>>; 
  subCategoryID: number | null;
  typeID: number | null;
  assetID: number | null;
  setAssetID: Dispatch<SetStateAction<number | null>>;
  currentAsset: Asset | null;
  updateAsset: (
    asset_id: number,
    updatedData: Partial<Asset>
  ) => Promise<any>;
}
const AssetContext = createContext<AssetContextType | undefined>(undefined);
export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categoryID, setCategoryID] = useState<number | null>(null);
  const [typeID, setTypeID] = useState<number | null>(null);
  const [subCategoryID, setSubCategoryID] = useState<number | null>(null);
  const [externalAssets, setExternalAssets] = useState<Asset[]>([]);
  const [assetID, setAssetID] = useState<number | null>(null);
  const [reload ,setReload] = useState(0);
  const location = useLocation(); // Hook to access location/state
  let url = "http://localhost/itam_api/asset.php?resource=asset";
  const getAssets = async () => {
    try {
      const response = await axios.get(url);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const insertAsset = async (data: Asset) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", data.file);
      const response = await axios.post(url, formData);
      if (response.data) {
        setReload(count => count=+1);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAssets = async () => {
      const assetData = await getAssets();
      if (assetData) {
        setAssets(assetData);
      }
    };
    fetchAssets();
  }, [reload]);

  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);

useEffect(() => {
  if (location.state?.assetId) {
    const fetchAsset = async () => {
      const assetData = await getAssets();
      const singleAsset = assetData.find((asset: { asset_id: any; }) => asset.asset_id === location.state.assetId);
      console.log(singleAsset);
      if (singleAsset) {
        setAssetID(singleAsset.asset_id);
        setCurrentAsset(singleAsset);
      }
    };
    fetchAsset();
  }
}, [location.state?.assetId]);


  useEffect(() => {
    const external = assets.filter((asset) => Number(asset.category_id) === 1);
    setExternalAssets(external);
  }, [assets]);
  
  const filteredAssets: Asset[] | [] = useMemo(() => {
    let newAssets = assets;
  
    if (categoryID) {
      newAssets = newAssets.filter((asset) => Number(asset.category_id) === categoryID);
    }
  
    if (subCategoryID) {
      newAssets = newAssets.filter((asset) => Number(asset.sub_category_id) === subCategoryID);
    }
  
    if (typeID) {
      newAssets = newAssets.filter((asset) => Number(asset.type_id) === typeID);
    }
  
    return newAssets;
  }, [categoryID, subCategoryID, typeID, assets]);

  const updateAsset = async (
    asset_id: number,
    updatedData: Partial<Asset>
  ) => {
    try {
      const response = await axios.put(
        `/api/assets/${asset_id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.data) {
        console.log("Asset updated successfully:", response.data);
        setReload((count) => count + 1);
        return response.data;
      }
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };
  
  
  const value = {
    assets,
    insertAsset,
    categoryID,
    subCategoryID,
    typeID,
    setCategoryID,
    setSubCategoryID,
    setTypeID,
    externalAssets,
    filteredAssets,
    assetID,
    setAssetID,
    currentAsset,
    updateAsset
  };
  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};
export const useAsset = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error("useAsset must be used within an AssetProvider");
  }
  return context;
};
