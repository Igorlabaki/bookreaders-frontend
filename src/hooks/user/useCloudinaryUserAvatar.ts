import { useMutation } from "@tanstack/react-query";

export function useCloudinaryUserAvatar(){
    const formData = new FormData();

    const {
        data: avatarUrl,
        isError: errorAvatarUrl,
        isLoading: urlAvatarIsLoading,
        mutate: urlAvatarMutate
        } = useMutation({
            mutationFn: async  (file: any) => {
                formData.append("file", file);
                formData.append("api_key", "972746539144337");
                formData.append("api_secret", "-odjGAqU-hd76JQeZUCHx5tbC8Y");
                formData.append("upload_preset", "onbridge");
                return await fetch(
                        "https:api.cloudinary.com/v1_1/dcjkvwbvh/image/upload",
                        {
                            method: "post",
                            body: formData,
                        }
                    ).then((res) => res.json());
            }
        })

    return {avatarUrl, errorAvatarUrl, urlAvatarIsLoading,  urlAvatarMutate}
}
