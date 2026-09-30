# AIR SCORE — GitHub Pages公開用

## 現在の状態

モック版です。航空機の位置から8秒の音楽ループを生成します。FlightAwareへの通信・課金は発生しません。

## GitHub Pagesに公開

1. このフォルダーの内容をGitHubリポジトリのルートに置きます（隠しフォルダー `.github` も必要）。
2. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** にします。
3. `main` ブランチに反映するか、Actionsの **Publish AIR SCORE → Run workflow** を実行します。
4. 成功した実行の `github-pages` 環境に公開URLが表示されます。

公開対象は `site/` のみです。`worker/` や設定ファイルはPagesには配信しません。既存リポジトリのブランチ名や既存サイトが異なる場合は、適用前に確認が必要です。

HTMLは `site/index.html` 単体でも開けます。Startで再生、Stopで先頭に戻ります。航空機数は停止中に変更できます。

## 次の段階：実データ接続

`worker/` はCloudflare Workersの接続準備用ひな形です。現時点では `/health` だけが動作し、`/aircraft` は未接続を示す503を返します。API接続済みではありません。

接続には次の設定・実装が必要です。

- FlightAwareの取得範囲・利用プラン・予算上限を決める。
- Cloudflare側で `AEROAPI_KEY` をSecretとして保存する（GitHubやHTMLにキーを書かない）。
- `ALLOWED_ORIGIN` を実際のGitHub Pagesのオリジンに設定する。リポジトリ名のパスは含めない。
- AeroAPIの対象エンドポイントと応答形式を確認し、緯度・経度・高度ft・速度kt・進行方位・観測時刻をアプリ形式に変換する。
- 共有キャッシュ、取得頻度・件数制限を実装してから公開する。CORS設定だけではAPIの不正利用や課金増加を防げない。
- HTMLのMockProviderを置き換え、定期更新・観測時刻補正・古い機体の除外を加える。

GitHub Actionsによる公開はまだ実行していません。Cloudflareへの配備も未実施です。

参考：
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://developers.cloudflare.com/workers/configuration/secrets/
